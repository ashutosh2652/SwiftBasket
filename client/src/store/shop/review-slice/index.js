import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  ProductReviewList: [],
};
export const addNewReview = createAsyncThunk(
  "/shop/addNewReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getCurrentProductReview = createAsyncThunk(
  "/shop/getCurrentProductReview",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductReviewList = action.payload.data;
      })
      .addCase(getCurrentProductReview.rejected, (state) => {
        state.isLoading = false;
        state.ProductReviewList = [];
      });
  },
});
export default reviewSlice.reducer;
