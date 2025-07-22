import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  updatecartItemQuantity,
} from "../../store/shop/cart-slice";
import { toast } from "sonner";

function CartItemsContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.ShoppingSlice);
  function updatecartItem(getcurrentproductId, operationType) {
    if (operationType === "plus") {
      const currentProductIndex = productList.findIndex(
        (product) => product._id === getcurrentproductId
      );
      const currentProductTotalStock =
        productList[currentProductIndex].totalstock;

      const currentProductQuantity = cartItems.quantity;
      if (currentProductQuantity + 1 > currentProductTotalStock) {
        toast.error(`Only ${currentProductTotalStock} items can be added`);
        return;
      }
    }
    dispatch(
      updatecartItemQuantity({
        userId: user.id,
        productId: getcurrentproductId,
        quantity:
          operationType === "minus"
            ? cartItems.quantity - 1
            : cartItems.quantity + 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast.success("Cart Updated Successfully");
      }
    });
  }
  function handlecartItemDelete(getcartItem) {
    dispatch(
      deleteCartItems({ userId: user.id, productId: getcartItem.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast.success("Product deleted successfully");
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems.image}
        alt={cartItems.title}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems.title}</h3>
        <div className="flex items-center mt-1 gap-4">
          <Button
            variant="outline"
            size="icon"
            className="text-black rounded-s-full border-muted cursor-pointer"
            disabled={cartItems?.quantity <= 1}
            onClick={() => updatecartItem(cartItems.productId, "minus")}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold text-lg">{cartItems.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="text-black  rounded-e-full border-muted cursor-pointer"
            onClick={() => updatecartItem(cartItems.productId, "plus")}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItems.salesPrice > 0
              ? cartItems.salesPrice
              : cartItems.price) * cartItems.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => handlecartItemDelete(cartItems)}
        />
      </div>
    </div>
  );
}
export default CartItemsContent;
