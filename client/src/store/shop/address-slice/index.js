import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  AddressList: [],
};
export const addAddress = createAsyncThunk(
  "/address/addAddress",
  async (
    { userId, address, state, pincode, city, notes, phone },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
        { userId, address, state, pincode, city, notes, phone }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.message || "Some error occured while adding Address"
      );
    }
  }
);
export const fetchAllAddress = createAsyncThunk(
  "/address/fetchAllAddress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Some error occured while fetching Address"
      );
    }
  }
);
export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({ userId, productId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/shop/address/edit/${userId}/${productId}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.message ||
          "Some error occured while editing the address"
      );
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/shop/address/delete/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.message ||
          "Some error occured while deleting address"
      );
    }
  }
);
const AddressSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AddressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.AddressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AddressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
        state.AddressList = [];
      });
  },
});
export default AddressSlice.reducer;
