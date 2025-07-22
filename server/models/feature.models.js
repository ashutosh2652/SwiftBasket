import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  image: String,
});
export const FeatureImage = mongoose.model("FeatureImage", featureSchema);
