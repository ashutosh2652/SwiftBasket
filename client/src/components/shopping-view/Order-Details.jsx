import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

function ShoppingOrderDetails() {
  const { OrderDetail } = useSelector((state) => state.ShopOrder);
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-pink-500 to-blue-600">
      <div className="grid gap-4">
        <div className="grid gap-2 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-red-700">Order Id</p>
            <p className="font-semibold text-black/70">{OrderDetail?._id}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-red-700">Order Date</p>
            <p className="font-semibold text-black/70">
              {OrderDetail?.orderDate.split("T")[0]}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-red-700">Order Price</p>
            <p className="font-semibold text-black/70">
              ${OrderDetail?.totalAmount}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-red-700">Order Status</p>
            <p className="font-semibold text-black/70">
              <Badge
                className={`py-1 px-2 ${
                  OrderDetail?.orderStatus === "Confirmed"
                    ? "bg-green-500"
                    : OrderDetail?.orderStatus === "Rejected"
                    ? "bg-red-500"
                    : "bg-black"
                }`}
              >
                {OrderDetail?.orderStatus}
              </Badge>
            </p>
          </div>
        </div>
        <Separator className="bg-black/80" />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Order Details</Label>
            <ul className="grid gap-3">
              {OrderDetail &&
              OrderDetail.cartItems &&
              OrderDetail.cartItems.length > 0
                ? OrderDetail.cartItems.map((ordereditem) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {ordereditem.title}</span>
                      <span>Quantity: {ordereditem.quantity}</span>
                      <span>Price: ${ordereditem.salePrice}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className=" text-lg">Shipping Info</div>
            <div className="grid gap-0.5 ">
              <span>
                Name:{"  "}
                {user?.userName}
              </span>
              <span>
                Address:{"  "}
                {OrderDetail?.addressInfo?.address}
              </span>
              <span>
                City:{"  "}
                {OrderDetail?.addressInfo?.city}
              </span>
              <span>
                Pincode:{"  "}
                {OrderDetail?.addressInfo?.pincode}
              </span>
              <span>
                Phone:{"  "}
                {OrderDetail?.addressInfo?.phone}
              </span>
              <span>
                notes:{"  "}
                {OrderDetail?.addressInfo?.notes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
export default ShoppingOrderDetails;
