import express from "express";
import { searchProduct } from "../../controllers/shop/search.controllers.js";
const router = express.Router();
router.get("/:keyword", searchProduct);
export default router;
