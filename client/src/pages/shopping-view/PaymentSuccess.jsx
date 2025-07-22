import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";

function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <Card className="p-10 bg-black text-secondary/50 border-black">
      <CardHeader>
        <CardTitle className="text-5xl mb-3 ">Payment Successfull</CardTitle>
      </CardHeader>
      <Button
        onClick={() => navigate("/shop/account")}
        className="cursor-pointer max-w-[150px] px-10 mx-8"
      >
        View Orders
      </Button>
    </Card>
  );
}
export default PaymentSuccess;
