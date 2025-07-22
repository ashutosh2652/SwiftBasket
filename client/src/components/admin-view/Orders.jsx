import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetails from "./Order-Details";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
  getAllOrderOfAllUser,
  getOrderDetails,
  resetOrderDetail,
} from "../../store/admin/order-slice";

function AdminOrderView() {
  const [opendialogbox, setopendialogbox] = useState(false);
  const { OrderDetail, OrderList } = useSelector((state) => state.AdminOrder);
  const dispatch = useDispatch();
  function handleOrderDetailDialog(orderId) {
    dispatch(getOrderDetails(orderId));
  }
  useEffect(() => {
    if (OrderDetail !== null) {
      setopendialogbox(true);
    }
  }, [OrderDetail]);
  useEffect(() => {
    dispatch(getAllOrderOfAllUser());
  }, [dispatch]);
  return (
    <Card className="bg-white/60">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Order Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OrderList && OrderList.length > 0
              ? OrderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem._id}...</TableCell>
                    <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-2 ${
                          orderItem?.orderStatus === "Confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "Rejected"
                            ? "bg-red-500"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>$ {orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={opendialogbox}
                        onOpenChange={() => {
                          setopendialogbox(false);
                          dispatch(resetOrderDetail());
                        }}
                      >
                        <Button
                          className="cursor-pointer"
                          onClick={() =>
                            handleOrderDetailDialog(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetails />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
export default AdminOrderView;
