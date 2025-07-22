import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetail: null,
};
export const fetchFilteredProducts = createAsyncThunk(
  "/shop/products/fetchfilteredproducts",
  async ({ selectedFilters, sortBy }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        ...selectedFilters,
        SortBy: sortBy,
      });
      // console.log("query", query);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown fetch error" }
      );
    }
  }
);
export const fetchProductDetail = createAsyncThunk(
  "/shop/products/fetchProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.message || { message: "Unknown fetch error" }
      );
    }
  }
);
const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.productList = [];
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        // console.log("fetchFilteredProducts", action.payload);
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
        state.productDetail = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action?.payload?.data;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.isLoading = false;
        state.productDetail = null;
      });
  },
});
export const { setProductDetails } = ShoppingProductSlice.actions;
export default ShoppingProductSlice.reducer;
