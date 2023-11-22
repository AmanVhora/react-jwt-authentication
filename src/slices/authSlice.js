import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  username: null
};

const baseUrl = "http://localhost:3001";

export const login = createAsyncThunk('auth/login', async (loginData) => {
  const response = await axios.post(`${baseUrl}/auth/login`, loginData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
    updateState: (state, action) => {
      console.log(action.payload);
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    })
  }
});

export default authSlice.reducer;
export const { logout, updateState } = authSlice.actions;
