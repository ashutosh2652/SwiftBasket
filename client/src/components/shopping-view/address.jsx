import { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../store/shop/address-slice";
import AddressCard from "./AddressCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
const initialFormData = {
  address: "",
  state: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address({ setcurrentSelectedAddress, currentSelectedAddress }) {
  const [formdata, setformdata] = useState(initialFormData);
  const [currentEditedId, setcurrentEditedId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { AddressList } = useSelector((state) => state.ShopAddress);
  const dispatch = useDispatch();
  function handleManageAddress(event) {
    event.preventDefault();
    if (AddressList.length >= 3 && currentEditedId === null) {
      setformdata(initialFormData);
      toast.error("You can Add only 3 Address");
      return;
    }
    {
      currentEditedId !== null
        ? dispatch(
            editAddress({
              userId: user?.id,
              productId: currentEditedId,
              formData: formdata,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              toast("Address Edited Successfully");
              setcurrentEditedId(null);
              setformdata(initialFormData);
            }
          })
        : dispatch(addAddress({ ...formdata, userId: user?.id })).then(
            (data) => {
              console.log("data", data);

              if (data.payload.success) {
                dispatch(fetchAllAddress(user?.id));
                setformdata(initialFormData);
                toast("Address Added Successfully");
              }
            }
          );
    }
  }
  function setIseditable() {
    return Object.keys(formdata)
      .map((AddressFormItem) => formdata[AddressFormItem] !== "")
      .every((item) => item);
  }
  function handleDeleteAddress(addressId) {
    dispatch(deleteAddress({ addressId, userId: user?.id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
      }
    });
  }
  function handleEditAddress(event, editProduct) {
    console.log("editProduct", editProduct);

    setcurrentEditedId(editProduct._id);
    setformdata({
      address: editProduct.address,
      state: editProduct.state,
      city: editProduct.city,
      pincode: editProduct.pincode,
      phone: editProduct.phone,
      notes: editProduct.notes,
    });
    handleManageAddress(event);
  }
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);
  return (
    <Card className="bg-black text-white">
      <h2 className="font-bold text-2xl ml-4">Your Added Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2   w-full gap-4 p-3 mb-5 overflow-hidden">
        {AddressList && AddressList.length > 0 ? (
          AddressList.map((AddressItem) => (
            <AddressCard
              key={AddressItem?._id}
              AddressInfo={AddressItem}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              setcurrentSelectedAddress={setcurrentSelectedAddress}
              currentSelectedAddress={currentSelectedAddress}
            />
          ))
        ) : (
          <div className="font-bold text-xl ml-3">No Address To Show</div>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add new Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          formData={formdata}
          setFormData={setformdata}
          onSubmit={handleManageAddress}
          isEditable={setIseditable()}
        />
      </CardContent>
    </Card>
  );
}
export default Address;
