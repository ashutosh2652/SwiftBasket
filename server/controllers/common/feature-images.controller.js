import { FeatureImage } from "../../models/feature.models.js";

const addfeatureImages = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Please provide image" });
    const featureimage = new FeatureImage({ image });
    await featureimage.save();
    return res.status(201).json({ success: true, data: featureimage });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while adding new image",
    });
  }
};

const getfeatureImages = async (req, res) => {
  try {
    const getAllFeatureImages = await FeatureImage.find({});
    return res.status(200).json({ success: true, data: getAllFeatureImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching all images",
    });
  }
};
export { addfeatureImages, getfeatureImages };
