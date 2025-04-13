import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  handleAddToCart,
  handleGetCartProducts,
  handleRemoveAllFromCart,
  handleUpdateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, handleGetCartProducts);
router.post("/", protectRoute, handleAddToCart);
router.delete("/", protectRoute, handleRemoveAllFromCart);
router.put("/:id", protectRoute, handleUpdateQuantity);

export default router;
