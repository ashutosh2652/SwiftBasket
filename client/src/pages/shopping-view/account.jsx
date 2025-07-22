import { TabsTrigger } from "@radix-ui/react-tabs";
import AccountImage from "../../assets/AccountImage.jpg";
import { Tabs, TabsContent, TabsList } from "../../components/ui/tabs";
import Address from "../../components/shopping-view/address";
import ShoppingOrders from "../../components/shopping-view/Orders";
function UserAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[300px]">
        <img
          src={AccountImage}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container grid grid-cols-1 mx-auto py-12 gap-8">
        <div className="flex flex-col rounded-lg border border-gray-600  bg-black text-white  p-6 shadow-lg">
          <Tabs defaultValue="orders">
            <TabsList className="bg-white/65 text-black border flex gap-3 ">
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-black/80 data-[state=active]:text-white px-4 py-2 rounded "
              >
                Order
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="data-[state=active]:bg-black/80 data-[state=active]:text-white px-4 py-2 rounded"
              >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default UserAccount;
