import express from "express";
import {
  handleGetCoupon,
  handleValidateCoupon,
} from "../controllers/coupon.contrller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, handleGetCoupon);
router.post("/validate", protectRoute, handleValidateCoupon);

export default router;
