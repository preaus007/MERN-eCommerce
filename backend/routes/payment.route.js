import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  handleCheckoutSuccess,
  handleCreateCheckoutSession,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  protectRoute,
  handleCreateCheckoutSession
);
router.post("/checkout-success", protectRoute, handleCheckoutSuccess);

export default router;
