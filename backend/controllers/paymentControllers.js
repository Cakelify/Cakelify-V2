import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.js";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order   =>  /api/v1/payment/checkout_session
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

// Verify Razorpay payment and create order   =>  /api/v1/payment/verify
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
