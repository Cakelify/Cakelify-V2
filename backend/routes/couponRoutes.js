import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import {
  createCoupon,
  validateCoupon,
  getAllCoupons,
} from "../controllers/couponControllers.js";

const router = express.Router();

router
  .route("/admin/coupons")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCoupon);
router
  .route("/admin/coupons")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllCoupons);
router.route("/coupons/:code").get(validateCoupon);

export default router;
