import {
  AuthLoginBody,
  AuthSignUpBody,
  AuthSliceInitialState,
} from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AuthSliceInitialState = {
  isLoading: false,
  error: null,
  token: null,
  success: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (body: AuthSignUpBody) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Register failed");
    }

    return data;
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (body: AuthLoginBody) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/signin`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      if (typeof window === "undefined") return;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Register Cases
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = "Account Created Successfully!";
      state.error = action.payload.error ?? null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.success = null;
      state.error = action.error.message?.includes("fetch")
        ? "Check your internet connection"
        : action.error.message!;
    });

    // Login Cases
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error ?? null;
      state.token = action.payload.token;
      state.success = "Logged in Successfully!";
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.success = null;
      state.error = action.error.message?.includes("fetch")
        ? "Check your internet connection"
        : action.error.message!;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logOut, setToken } = authSlice.actions;
