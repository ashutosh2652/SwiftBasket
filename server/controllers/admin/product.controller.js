import { deleteImage, UploadImage } from "../../helper/cloudinary.js";
import { Products } from "../../models/Products.models.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await UploadImage(url);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const addProuct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalstock,
    } = req.body;
    const newlycreatedProduct = new Products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalstock,
    });
    await newlycreatedProduct.save();
    res.status(200).json({
      success: true,
      message: "Newly Product Added Successfully!",
      data: newlycreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const fetchAllProduct = async (req, res) => {
  try {
    const listofProducts = await Products.find({});
    res.status(200).json({ success: true, data: listofProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching the products",
    });
  }
};
const editProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalstock,
    } = req.body;
    const findProduct = await Products.findById(id);
    if (!findProduct)
      return res.status(400).json({
        success: false,
        message: "Invalid Product Id or Product doesnot exist",
      });
    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salesPrice =
      salesPrice !== null ? salesPrice : findProduct.salesPrice;
    findProduct.totalstock = totalstock || findProduct.totalstock;
    await findProduct.save();
    res.status(200).json({ success: true, data: findProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteProducts = async (req, res) => {
  try {
    console.log("Delete1", req.params, "Delete");
    const { id } = req.params;
    const product = await Products.findById(id);
    const image = product?.image;
    const result = await deleteImage(image.split("/")[7].split(".")[0]);
    if (!result)
      return res.status(500).json({
        success: false,
        message: "Something wents wrong while deleting image from cloudinary",
      });
    await product.deleteOne();
    if (!product)
      return res.status(400).json({
        success: false,
        message: "Invalid Product Id or Product doesn't exist",
      });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something wents wrong while deleting Product",
    });
  }
};
export {
  handleImageUpload,
  addProuct,
  fetchAllProduct,
  editProducts,
  deleteProducts,
};
