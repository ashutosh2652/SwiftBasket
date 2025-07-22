import { Order } from "../../models/Orders.models.js";
import { Products } from "../../models/Products.models.js";
import { Review } from "../../models/Review.models.js";

const addNewReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    console.log({ productId, userId, userName, reviewMessage, reviewValue });

    if (!productId || !userId || !userName || !reviewMessage || !reviewValue)
      return res
        .status(404)
        .json({ success: false, message: "Invalid data provided" });
    const product = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "Confirmed",
    });
    if (!product)
      return res.status(403).json({
        success: false,
        message: "Please purchase product before giving review",
      });
    const isReviewGiven = await Review.findOne({ productId, userId });
    if (isReviewGiven)
      return res
        .status(403)
        .json({ success: false, message: "Review Already given!" });
    const ProductReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await ProductReview.save();
    const ReviewofcurrentProduct = await Review.find({ productId });
    const reviewlength = ReviewofcurrentProduct.length;
    const averageReview =
      ReviewofcurrentProduct.reduce(
        (sum, currentReview) => (sum = sum + currentReview.reviewValue),
        0
      ) / reviewlength;
    await Products.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({ success: true, data: ProductReview });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while adding new review" });
  }
};
const fetchReview = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId)
      res
        .status(400)
        .json({ success: false, message: "Please provide productId" });
    const allReviews = await Review.find({ productId });
    res.status(200).json({ success: true, data: allReviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching review",
    });
  }
};
export { addNewReview, fetchReview };
