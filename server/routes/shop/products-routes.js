import express from "express";
const router = express.Router();
import {
  fetchFilteredProducts,
  fetchProductById,
} from "../../controllers/shop/product.controllers.js";
router.get("/get", fetchFilteredProducts);
router.route("/get/:id").get(fetchProductById);
export default router;
