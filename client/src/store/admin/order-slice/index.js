import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  OrderList: [],
  OrderDetail: null,
};
export const getAllOrderOfAllUser = createAsyncThunk(
  "/admin/getAllOrderOfAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/order/list`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "/admin/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/order/details/${id}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "/admin/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/order/update/${id}`,
        { orderStatus }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const AdminOrderSlice = createSlice({
  name: "AdminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetail: (state) => {
      state.OrderDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderOfAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderOfAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderList = action.payload.data;
      })
      .addCase(getAllOrderOfAllUser.rejected, (state) => {
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
export const { resetOrderDetail } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
