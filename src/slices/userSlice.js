import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  users: [],
  currentUser: {}
};
const baseUrl = "http://localhost:3001";

export const allUsers = createAsyncThunk('users/allUsers', async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
});

export const createAccount = createAsyncThunk('users/createAccount', async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, data);
    return response.data;
  } catch (error) {
    console.error('Request failed: ', error.message);
  }  
});

export const editProfile = createAsyncThunk('users/editProfile', async ({ id, token, userData }) => {
  try {
    const response = await axios.put(`${baseUrl}/users/${id}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized User: ', error);
    } else {
      console.error('Request failed: ', error);
    }
  }
});

export const deleteAccount = createAsyncThunk('users/deleteAccount', async ({ id, token }) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized User: ', error);
    } else {
      console.error('Request failed: ', error);
    }
  }
});

// Authentication Actions

export const login = createAsyncThunk('users/login', async (loginData) => {
  const response = await axios.post(`${baseUrl}/auth/login`, loginData);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.currentUser = {};
    }
  },
  extraReducers: builder => {
    builder.addCase(allUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(createAccount.fulfilled, (state, action) => {
      state.users.push(action.payload);
    })
    .addCase(editProfile.fulfilled, (state, action) => {
      const { id, name, username, email, password } = action.payload;
      const currentUser = state.currentUser;
      const user = state.users.find(user => user.id === id);

      currentUser.name = name;
      currentUser.username = username;
      currentUser.email = email;
      currentUser.password = password;
      
      user.name = name;
      user.username = username;
      user.email = email;
      user.password = password;
    })
    .addCase(deleteAccount.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    })
    // Authentication Reducers
    .addCase(login.fulfilled, (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      const user = state.users.find(user => user.username === username);
      state.currentUser = user;
    })
  }
});

export default usersSlice.reducer;
export const { logout } = usersSlice.actions;
