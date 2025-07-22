import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  productList: [],
};
export const addNewProducts = createAsyncThunk(
  "/products/addnewproducts",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log(formData, "Fo!!rm");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Edata", response);

      return response.data;
    } catch (error) {
      console.log(formData);

      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown edit error" }
      );
    }
  }
);
export const deleteProducts = createAsyncThunk(
  "/products/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log("deleteproductid", id);

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown delete Error" }
      );
    }
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/products/get`
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
const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});
export default AdminProductSlice.reducer;
