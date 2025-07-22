import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemsContent from "./cart-items-content";

function CartWrapper({ cartItems, setopencardsheet }) {
  const navigate = useNavigate();
  const cartitemstotalprice =
    (cartItems &&
      cartItems.items &&
      cartItems.items.length > 0 &&
      cartItems.items
        .reduce(
          (sum, item) =>
            sum +
            (item.salesPrice > 0 ? item.salesPrice : item.price) *
              item.quantity,
          0
        )
        .toFixed(2)) ||
    0.0;
  return (
    <SheetContent className="sm:max-w-md p-4 overflow-auto">
      <SheetHeader>
        <SheetTitle className="text-white ">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems &&
          cartItems.items &&
          cartItems.items.length > 0 &&
          cartItems.items.map((item) => (
            <CartItemsContent cartItems={item} key={item.productId} />
          ))}
      </div>
      <div className="flex justify-end h-full flex-col  ">
        <div className="mt-8 space-y-4">
          <div className="flex justify-between ">
            <span className="font-bold">Total</span>
            <span className="font-bold">$ {cartitemstotalprice}</span>
          </div>
        </div>

        <Button
          disabled={cartitemstotalprice <= 0}
          className="w-full mt-6 mb-5 bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer hover:from-blue-700 hover:to-purple-700"
          onClick={() => {
            setopencardsheet(false);
            navigate("/shop/checkout");
          }}
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}
export default CartWrapper;
