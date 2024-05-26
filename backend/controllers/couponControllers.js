import Coupon from "../models/coupon.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create a new coupon
export const createCoupon = catchAsyncErrors(async (req, res, next) => {
  const { code, discount, validFrom, validUntil } = req.body;
  const coupon = await Coupon.create({ code, discount, validFrom, validUntil });
  res.status(201).json({ success: true, coupon });
});

// Validate a coupon
export const validateCoupon = catchAsyncErrors(async (req, res, next) => {
  const { code } = req.params;
  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  const currentDate = new Date();
  if (
    currentDate < coupon.validFrom ||
    currentDate > coupon.validUntil ||
    !coupon.active
  ) {
    return next(new ErrorHandler("Coupon is not valid", 400));
  }

  res.status(200).json({ success: true, discount: coupon.discount });
});

// Get all coupons
export const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find();
  res.status(200).json({ success: true, coupons });
});
