import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salesPrice: String,
    totalstock: String,
  },
  { timestamps: true }
);

export const Products = mongoose.model("Products", ProductSchema);
