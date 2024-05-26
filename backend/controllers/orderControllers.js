import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import Coupon from "../models/coupon.js";

// Create new Order  =>  /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    couponCode,
  } = req.body;

  let finalAmount = totalAmount;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (coupon) {
      const currentDate = new Date();
      if (
        currentDate >= coupon.validFrom &&
        currentDate <= coupon.validUntil &&
        coupon.active
      ) {
        finalAmount -= (finalAmount * coupon.discount) / 100;
      } else {
        return next(new ErrorHandler("Invalid coupon", 400));
      }
    } else {
      return next(new ErrorHandler("Coupon not found", 404));
    }
  }

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount: finalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// Get current user orders  =>  /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    orders,
  });
});

// Get order details  =>  /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    order,
  });
});

// Get all orders - ADMIN  =>  /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    orders,
  });
});

// Update Order - ADMIN  =>  /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  let productNotFound = false;

  // Update products stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      productNotFound = true;
      break;
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  if (productNotFound) {
    return next(
      new ErrorHandler("No Product found with one or more IDs.", 404)
    );
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

// Delete order  =>  /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

async function getSalesData(startDate, endDate) {
  const salesData = await Order.aggregate([
    {
      // Stage 1 - Filter results
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      // Stage 2 - Group Data
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        numOrders: { $sum: 1 }, // count the number of orders
      },
    },
  ]);

  // Create a Map to store sales data and num of order by data
  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;

  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrders;

    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });

  // Generate an array of dates between start & end Date
  const datesBetween = getDatesBetween(startDate, endDate);

  // Create final sales data array with 0 for dates without sales
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
  }));

  return { salesData: finalSalesData, totalSales, totalNumOrders };
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// Get Sales Data  =>  /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  const { salesData, totalSales, totalNumOrders } = await getSalesData(
    startDate,
    endDate
  );

  res.status(200).json({
    totalSales,
    totalNumOrders,
    sales: salesData,
  });
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order   =>  /api/v1/orders/checkout_session
export const razorpayCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
    } = req.body;

    const options = {
      amount: totalAmount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${req.user._id}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  }
);

// Verify Razorpay payment and create order   =>  /api/v1/orderst/verify
export const razorpayPaymentVerification = catchAsyncErrors(
  async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
      } = req.body;

      const paymentInfo = {
        id: razorpay_payment_id,
        status: "Paid",
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user: req.user._id,
      };

      await Order.create(orderData);

      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  }
);
