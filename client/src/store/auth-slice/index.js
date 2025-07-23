import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        FormData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log("E!!or", error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error!" }
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        FormData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error!" }
      );
    }
  }
);
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate,",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "logout failed" }
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        toast.loading("Creating your Account.", {
          id: "register-loading",
        });
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.dismiss("register-loading");
        toast.success("Account created Successfully!");
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.dismiss("register-loading");
      })
      .addCase(loginUser.pending, (state) => {
        toast.loading("Checking Authorization.", {
          id: "logging-loading",
        });
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.success ? action?.payload?.user : null;
        state.isAuthenticated = action?.payload?.success;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
        toast.dismiss("logging-loading");
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        toast.dismiss("logging-loading");
      })
      .addCase(checkAuth.pending, (state) => {
        toast.loading("Checking Authorization.", {
          id: "checkauth-loading",
        });
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.success ? action?.payload?.user : null;
        state.isAuthenticated = action?.payload?.success;
        toast.dismiss("checkauth-loading");
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        console.log("action", action.payload);
        toast.dismiss("checkauth-loading");
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        sessionStorage.clear();
        state.token = null;
      });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
