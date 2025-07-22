import { Address } from "../../models/Address.models.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, state, pincode, city, notes, phone } = req.body;
    console.log(
      { userId, address, state, pincode, city, notes, phone },
      "AddressDetail"
    );

    if (!userId || !address || !state || !pincode || !city || !notes || !phone)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Data provided" });
    const newAddress = new Address({
      userId,
      address,
      state,
      pincode,
      city,
      notes,
      phone,
    });
    await newAddress.save();
    res.status(200).json({ success: true, data: newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId provided" });
    const addressList = await Address.find({ userId });
    res.status(200).json({ success: true, data: addressList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid details provided" });
    const address = await Address.findByIdAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!address)
      res.status(401).json({ success: false, message: "No Address is found" });
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid details provided" });
    const address = await Address.findByIdAndDelete({ _id: addressId, userId });
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Wrong details provided" });
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
export { addAddress, editAddress, fetchAllAddress, deleteAddress };
