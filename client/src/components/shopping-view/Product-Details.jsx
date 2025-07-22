import { StarIcon } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../store/shop/products-slice";
import StarRating from "./star-rating";
import { useEffect, useState } from "react";
import {
  addNewReview,
  getCurrentProductReview,
} from "../../store/shop/review-slice";
import { toast } from "sonner";

function ProductDetailDialog({
  open,
  setopen,
  productDetail,
  handleAddToCart,
}) {
  const [commentMssg, setcommentMssg] = useState("");
  const [rating, setrating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ProductReviewList } = useSelector((state) => state.ProductReview);

  const reviewlength = ProductReviewList && ProductReviewList.length;
  const averageReview =
    ProductReviewList && ProductReviewList.length > 0
      ? ProductReviewList.reduce(
          (sum, currentReview) => (sum = sum + currentReview.reviewValue),
          0
        ) / reviewlength
      : 0;
  function handleproductdetailsdialog() {
    setopen(false);
    dispatch(setProductDetails());
  }
  function handleComment() {
    dispatch(
      addNewReview({
        productId: productDetail?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: commentMssg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setrating(0);
        setcommentMssg("");
        dispatch(getCurrentProductReview(productDetail?._id));
        toast.success("Review Added successfully");
      } else {
        setrating(0);
        setcommentMssg("");
        toast.error(data.payload);
      }
    });
  }
  useEffect(() => {
    if (productDetail !== null) {
      dispatch(getCurrentProductReview(productDetail?._id));
    }
  }, [productDetail]);
  return (
    <Dialog open={open} onOpenChange={handleproductdetailsdialog}>
      <DialogContent className="bg-gray-800 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] grid grid-cols-2 gap-8 sm:p-12">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={productDetail?.image}
            alt={productDetail?.title}
            height={600}
            width={600}
            className="object-cover w-full aspect-square"
          />
        </div>
        <div>
          <div>
            <h1 className="font-extrabold text-3xl text-muted">
              {productDetail?.title}
            </h1>
            <p className="text-muted-foreground text-xl mt-3 mb-4">
              {productDetail?.description}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p
              className={`${
                productDetail?.salesPrice > 0 ? "line-through" : ""
              } text-muted text-2xl font-semibold`}
            >
              ${productDetail?.price}
            </p>
            {productDetail?.salesPrice > 0 ? (
              <p className="text-red-500 text-2xl font-semibold">
                {productDetail?.salesPrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              {averageReview ? `(${averageReview})` : null}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetail?.totalstock <= 0 ? (
              <Button disabled className="w-full cursor-not-allowed bg-red-500">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full cursor-pointer bg-blue-500"
                onClick={() => handleAddToCart(productDetail?._id)}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="font-bold text-xl mb-4 text-muted">Reviews</h2>
            <div className="grid gap-6">
              {ProductReviewList && ProductReviewList.length > 0 ? (
                ProductReviewList.map((review) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border ">
                      <AvatarFallback className="bg-gray-200">
                        {review.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="font-bold flex items-center text-purple-300">
                        {review.userName}
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={review.reviewValue} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Review Available</h1>
              )}
            </div>
            <div className="flex flex-col mt-4 mb-3 gap-2">
              <Label className="text-xl text-white/50">Write a Review</Label>
              <div className="flex">
                <StarRating rating={rating} setrating={setrating} />
              </div>

              <Input
                placeholder="Write your review"
                className="border-accent-foreground bg-cyan-200"
                value={commentMssg}
                onChange={(event) => setcommentMssg(event.target.value)}
              />
              <Button
                className="cursor-pointer bg-purple-500 hover:bg-purple-600 mr-2"
                disabled={rating == 0 || commentMssg.trim() === ""}
                onClick={handleComment}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ProductDetailDialog;
