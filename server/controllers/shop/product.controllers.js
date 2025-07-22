import { Products } from "../../models/Products.models.js";
const fetchFilteredProducts = async (req, res) => {
  try {
    const { Category = [], Brand = [], SortBy = "low-to-high" } = req.query;
    // console.log("Hello");
    // console.log(Category.length);
    // console.log(req.query);

    const filter = {};
    const sort = {};
    switch (SortBy) {
      case "low-to-high":
        sort.price = 1;
        break;
      case "high-to-low":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }
    if (Category.length) {
      filter.category = { $in: Category.split(",") };
    }
    if (Brand.length) {
      filter.brand = { $in: Brand.split(",") };
    }
    // console.log(filter);
    // console.log("sort", sort);

    const fetchProduct = await Products.find(filter).sort(sort);
    // console.log(fetchProduct);

    res.status(200).json({
      success: true,
      data: fetchProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured which fetching the filteredProducts",
    });
  }
};
const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const fetchedproduct = await Products.findById(id);
    if (!fetchedproduct)
      return res.status(404).json({
        success: false,
        message: "Wrong product id or product doesnot exist",
      });
    res.status(200).json({ success: true, data: fetchedproduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while fetching product" });
  }
};
export { fetchFilteredProducts, fetchProductById };
