import express from "express";
import { upload } from "../../helper/cloudinary.js";
import {
  handleImageUpload,
  addProuct,
  editProducts,
  fetchAllProduct,
  deleteProducts,
} from "../../controllers/admin/product.controller.js";
const router = express.Router();
router.post("/image-upload", upload.single("my-file"), handleImageUpload);
router.post("/add", addProuct);
router.get("/get", fetchAllProduct);
router.delete("/delete/:id", deleteProducts);
router.put("/edit/:id", editProducts);
export default router;
