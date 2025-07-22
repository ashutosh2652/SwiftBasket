import { useDispatch, useSelector } from "react-redux";
import CheckOutImage from "../../assets/accountImage.jpg";
import Address from "../../components/shopping-view/address";
import CartItemsContent from "../../components/shopping-view/cart-items-content";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useState } from "react";
import { createNewOrder } from "../../store/shop/order-slice";
import { toast } from "sonner";
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.ShoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approval_url } = useSelector((state) => state.ShopOrder);
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setisPaymentStart] = useState(false);
  const dispatch = useDispatch();
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
  function handlePaymentWithPaypal() {
    console.log("currentSelectedAddress", currentSelectedAddress);

    if (currentSelectedAddress === null) {
      toast.error("Please Select Address Before Payment");
      return;
    }
    if (cartItems?.items.length <= 0) {
      toast.error("Please Add Some Items");
      return;
    }
    const cartitems =
      cartItems && cartItems.items && cartItems.items.length > 0
        ? cartItems.items.map((cartItem) => ({
            productId: cartItem.productId,
            title: cartItem.title,
            image: cartItem.image,
            salePrice:
              cartItem.salesPrice > 0 ? cartItem.salesPrice : cartItem.price,
            quantity: cartItem.quantity,
          }))
        : null;
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartitems,
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        state: currentSelectedAddress?.state,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: cartitemstotalprice,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData))
      .then((data) => {
        console.log(data, "data");

        if (data.payload?.success) {
          setisPaymentStart(true);
        } else {
          setisPaymentStart(false);
        }
      })
      .catch((error) => {
        setcurrentSelectedAddress(null);
        setisPaymentStart(false);
        console.log(error);
      });
  }
  if (isPaymentStart && approval_url) {
    window.location.href = approval_url;
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[300px]">
        <img
          src={CheckOutImage}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
        <div className="w-full">
          <Address
            setcurrentSelectedAddress={setcurrentSelectedAddress}
            currentSelectedAddress={currentSelectedAddress}
          />
        </div>
        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle className="font-bold text-xl text-muted-foreground">
              Proceed With Following Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-8 space-y-4">
              {cartItems &&
                cartItems.items &&
                cartItems.items.length > 0 &&
                cartItems.items.map((item) => (
                  <CartItemsContent cartItems={item} key={item.productId} />
                ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between ">
                <span className="font-bold">Total</span>
                <span className="font-bold">$ {cartitemstotalprice}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full mt-6 mb-5 bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer hover:from-blue-700 hover:to-purple-700"
              onClick={handlePaymentWithPaypal}
            >
              {isPaymentStart
                ? "Paypal Loading... Please Wait.."
                : " Pay With PayPal"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
export default ShoppingCheckout;
