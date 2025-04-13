import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/db.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// const isLoggedIn = (req, res, next) => {
//   const flag = false;
//   if (flag) {
//     next();
//   } else {
//     return res.status(401).json({
//       message: "Log in first...",
//     });
//   }
// };

// app.get("/api/profile", isLoggedIn, (req, res) => {
//   res.status(201).send({
//     message: "Showing user profile...",
//   });
// });

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
