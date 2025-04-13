import express from "express";
import {
  handleFeaturedProducts,
  handleGetAllProducts,
  handleCreateProduct,
  handleDeleteProduct,
  handleRecommendedProducts,
  handleGetProductsByCategory,
  handleToggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, handleGetAllProducts);
router.get("/feature", handleFeaturedProducts);
router.get("/category/:category", handleGetProductsByCategory);
router.get("/recommendation", handleRecommendedProducts);
router.post("/", protectRoute, adminRoute, handleCreateProduct);
router.patch("/:id", protectRoute, adminRoute, handleToggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, handleDeleteProduct);

export default router;
