import express from "express";
import {
  addNewReview,
  fetchReview,
} from "../../controllers/shop/productReview.controllers.js";
const router = express.Router();
router.post("/add", addNewReview);
router.get("/:productId", fetchReview);
export default router;
