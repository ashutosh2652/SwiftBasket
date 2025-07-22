import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  approval_url: null,
  orderId: null,
  OrderList: [],
  OrderDetail: null,
};
export const createNewOrder = createAsyncThunk(
  "/shop/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        orderData
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.message ||
          "Some error occured while creating new order"
      );
    }
  }
);
export const capturePayment = createAsyncThunk(
  "/shop/capturePayment",
  async ({ orderId, paymentId, payerId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
        { orderId, payerId, paymentId }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.message ||
          "Some error occured while capturing Payment"
      );
    }
  }
);

export const getAllOrderByUserId = createAsyncThunk(
  "/shop/getAllOrderByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "/shop/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const ShoppingOrderSlice = createSlice({
  name: "ShoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetail: (state) => {
      state.OrderDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.approval_url = null;
        state.orderId = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approval_url = action.payload.approval_url;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approval_url = null;
        state.orderId = null;
      })
      .addCase(getAllOrderByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderList = action.payload.data;
      })
      .addCase(getAllOrderByUserId.rejected, (state) => {
        state.isLoading = false;
        state.OrderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderDetail = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.OrderDetail = null;
      });
  },
});
export const { resetOrderDetail } = ShoppingOrderSlice.actions;
export default ShoppingOrderSlice.reducer;
