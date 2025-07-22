import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: String,
  address: String,
  state: String,
  city: String,
  pincode: String,
  phone: String,
  notes: String,
});

export const Address = mongoose.model("Address", AddressSchema);
