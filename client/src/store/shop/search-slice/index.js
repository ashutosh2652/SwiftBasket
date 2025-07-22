import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isLoading: false, SearchedProductList: [] };
export const searchProduct = createAsyncThunk(
  "/shop/searchSlice",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/search/${keyword}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.resonse.data.message);
    }
  }
);
const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setproductlist: (state) => {
      state.SearchedProductList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.SearchedProductList = action.payload.data;
      })
      .addCase(searchProduct.rejected, (state) => {
        state.isLoading = false;
        state.SearchedProductList = [];
      });
  },
});
export const { setproductlist } = searchSlice.actions;
export default searchSlice.reducer;
