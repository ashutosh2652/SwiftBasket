import { Products } from "../../models/Products.models.js";

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be string",
      });
    }
    const regex = new RegExp(keyword, "i");
    const findfilter = {
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ],
    };
    const filteredProducts = await Products.find(findfilter);
    return res.status(200).json({ success: true, data: filteredProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while searching product",
    });
  }
};
export { searchProduct };
