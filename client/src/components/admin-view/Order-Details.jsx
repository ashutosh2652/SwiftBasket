import { Separator } from "../ui/separator";
import { DialogContent } from "../ui/dialog";
import CommonForm from "../common/form";
import { AdminOrderDetailformControl } from "../../config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
  getAllOrderOfAllUser,
  getOrderDetails,
  updateOrderStatus,
} from "../../store/admin/order-slice";
import { toast } from "sonner";
const initialFormData = {
  status: "",
};
function AdminOrderDetails() {
  const [formdata, setformdata] = useState(initialFormData);
  const { OrderDetail } = useSelector((state) => state.AdminOrder);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleformsubmit(event) {
    event.preventDefault();
    const status = formdata.status;
    dispatch(
      updateOrderStatus({ id: OrderDetail?._id, orderStatus: status })
    ).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        dispatch(getOrderDetails(OrderDetail?._id));
        dispatch(getAllOrderOfAllUser());
      }
    });
  }
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
            <div className="text-lg">Order Details</div>
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
              <span>Name: {user.userName}</span>
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
          <div>
            <CommonForm
              formControls={AdminOrderDetailformControl}
              formData={formdata}
              setFormData={setformdata}
              onSubmit={handleformsubmit}
              buttonText={"Change Status"}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
export default AdminOrderDetails;
