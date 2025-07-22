import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../controllers/shop/address.controllers.js";
const router = express.Router();

router.route("/add").post(addAddress);
router.route("/get/:userId").get(fetchAllAddress);
router.route("/edit/:userId/:addressId").put(editAddress);
router.route("/delete/:userId/:addressId").delete(deleteAddress);
export default router;
