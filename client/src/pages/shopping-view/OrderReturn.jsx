import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { capturePayment } from "../../store/shop/order-slice";
function ShoppingOrderReturn() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchparams = new URLSearchParams(location.search);
  const paymentId = searchparams.get("paymentId");
  const payerId = searchparams.get("PayerID");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  console.log(paymentId, "paymentId");
  // console.log(PayerID, "PayerID");
  useEffect(() => {
    dispatch(capturePayment({ orderId, paymentId, payerId })).then((data) => {
      if (data.payload.success) {
        sessionStorage.removeItem("currentOrderId");
        navigate("/shop/payment-success");
      }
    });
  }, [dispatch, paymentId, payerId]);
  return (
    <Card className="bg-black/90 text-white/80 border-black">
      <CardHeader>
        <CardTitle>Payment is Loading...Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
}
export default ShoppingOrderReturn;
