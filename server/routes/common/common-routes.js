import express from "express";
import {
  addfeatureImages,
  getfeatureImages,
} from "../../controllers/common/feature-images.controller.js";
const router = express.Router();
router.post("/add", addfeatureImages);
router.get("/get", getfeatureImages);
export default router;
