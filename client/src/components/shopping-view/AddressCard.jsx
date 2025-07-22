import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
function AddressCard({
  AddressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setcurrentSelectedAddress,
  currentSelectedAddress,
}) {
  return (
    <Card
      className="bg-gray-400  min-w-[180px] relative"
      onClick={() => setcurrentSelectedAddress(AddressInfo)}
    >
      <Checkbox
        id={AddressInfo?.phone}
        className="absolute top-2 left-1 border-white/60 cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        checked={currentSelectedAddress === AddressInfo}
      />
      <CardContent className="grid gap-3">
        <Label>Address: {AddressInfo?.address}</Label>
        <Label>City: {AddressInfo?.city}</Label>
        <Label>State: {AddressInfo?.state}</Label>
        <Label>Pincode: {AddressInfo?.pincode}</Label>
        <Label>Phone: +91{AddressInfo?.phone}</Label>
        <Label>Notes: {AddressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          className="cursor-pointer"
          onClick={(event) => handleEditAddress(event, AddressInfo)}
        >
          Edit
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => handleDeleteAddress(AddressInfo?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
export default AddressCard;
