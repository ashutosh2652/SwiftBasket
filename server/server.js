import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_SECRET_URI)
  .then(() => {
    console.log("MONGODB connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
const whitelist = [process.env.CLIENT_BASE_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        // return callback(new Error("Origin Header is required!"));
        return callback(null, true);
      }
      if (whitelist.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS Policy: This origin is not allowed!"));
      }
    },
    allowedHeaders: [
      "Content-Type",
      "Pragma",
      "Cache-Control",
      "Authorization",
      "Expires",
    ],
    credentials: true,
    methods: ["GET", "DELETE", "POST", "PUT"],
  })
);
app.use(cookieParser());
app.use(express.json());

//auth
import AuthRouter from "./routes/auth/auth-routes.js";
app.use("/api/auth", AuthRouter);

//admin
import AdminProductRoutes from "./routes/admin/product-routes.js";
app.use("/api/admin/products", AdminProductRoutes);
import AdminOrderRoutes from "./routes/admin/order-routes.js";
app.use("/api/admin/order", AdminOrderRoutes);

//shop
import ShopProductRoutes from "./routes/shop/products-routes.js";
app.use("/api/shop/products", ShopProductRoutes);
import CartProductRoutes from "./routes/shop/cart-routes.js";
app.use("/api/shop/cart", CartProductRoutes);
import CustomerAddressRoutes from "./routes/shop/address-routes.js";
app.use("/api/shop/address", CustomerAddressRoutes);
import CustomerOrderRoutes from "./routes/shop/order-routes.js";
app.use("/api/shop/order", CustomerOrderRoutes);
import SearchOrderRoutes from "./routes/shop/search-routes.js";
app.use("/api/shop/search", SearchOrderRoutes);
import ReviewOrderRoutes from "./routes/shop/review-routes.js";
app.use("/api/shop/review", ReviewOrderRoutes);

//common
import CommonFeatureRoutes from "./routes/common/common-routes.js";
app.use("/api/common/feature", CommonFeatureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening to port:${PORT}`));
