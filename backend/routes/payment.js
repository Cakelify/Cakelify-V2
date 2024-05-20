import express from "express";
const router = express.Router();

import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  razorpayCheckoutSession,
  razorpayPaymentVerification,
} from "../controllers/paymentControllers.js";
import { newOrder } from "../controllers/orderControllers.js";

router
  .route("/payment/checkout_session")

  .post(isAuthenticatedUser, razorpayCheckoutSession);

router.route("/orders/new").post(isAuthenticatedUser, newOrder);

router
  .route("/payment/verify")
  .post(isAuthenticatedUser, razorpayPaymentVerification);

export default router;
