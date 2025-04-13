import express from "express";
import {
  handleLogIn,
  handleLogOut,
  handleRefreshToken,
  handleSignUp,
  handleGetProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", handleSignUp);
router.post("/log-in", handleLogIn);
router.post("/log-out", handleLogOut);
router.post("/refresh-token", handleRefreshToken);
router.post("/user-profile", protectRoute, handleGetProfile);

export default router;
