import express from "express";
import {
  getAllOrderOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order.controller.js";
const router = express.Router();
router.get("/list", getAllOrderOfAllUser);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
export default router;
