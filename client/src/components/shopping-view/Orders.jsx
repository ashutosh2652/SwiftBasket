import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetails from "./Order-Details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderByUserId,
  getOrderDetails,
  resetOrderDetail,
} from "../../store/shop/order-slice";
import { toast } from "sonner";
function ShoppingOrders() {
  const [opendialogbox, setopendialogbox] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { OrderList } = useSelector((state) => state.ShopOrder);
  const dispatch = useDispatch();
  function handleOrderDetailDialog(orderItemId) {
    dispatch(getOrderDetails(orderItemId))
      .then((data) => {
        if (data.payload.success) {
          setopendialogbox(true);
        } else {
          toast.error("Failed to fetch Order Detail");
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch Order Detail");
      });
  }
  useEffect(() => {
    dispatch(getAllOrderByUserId(user?.id));
  }, [dispatch]);

  return (
    <Card className="bg-white/75">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">Order History</CardTitle>
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
                <span className="sr-only">Details</span>
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
                        <ShoppingOrderDetails />
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
export default ShoppingOrders;
