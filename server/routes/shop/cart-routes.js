import express from "express";
import {
  addToCart,
  fetchCartItems,
  updatecartItemQuantity,
  deleteCartItems,
} from "../../controllers/shop/cart.controllers.js";
const router = express.Router();
router.route("/add").post(addToCart);
router.route("/get/:userId").get(fetchCartItems);
router.route("/user-cart").put(updatecartItemQuantity);
router.route("/:userId/:productId").delete(deleteCartItems);
export default router;
