import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  FeatureImageList: [],
};
export const addfeatureImages = createAsyncThunk(
  "/common/addfeatureImages",
  async (image, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
        { image }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getfeatureImages = createAsyncThunk(
  "/common/getfeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/common/feature/get`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const featureSlice = createSlice({
  name: "featureSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getfeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getfeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FeatureImageList = action.payload.data;
      })
      .addCase(getfeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.FeatureImageList = [];
      });
  },
});
export default featureSlice.reducer;
