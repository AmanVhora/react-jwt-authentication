import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  username: null
};
const baseUrl = "http://localhost:3001";

const response = await axios.get(`${baseUrl}/users`);
export const allUsers = response.data;

export const createAccount = createAsyncThunk('users/createAccount', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }  
});

export const editProfile = createAsyncThunk('users/editProfile', async ({ id, token, user }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseUrl}/users/${id}`, {user}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
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
export const login = createAsyncThunk('users/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(createAccount.fulfilled, (state, action) => {
      allUsers.push(action.payload);
      state.signupErrors = undefined;
    })
    .addCase(createAccount.rejected, (state, action) => {
      const { errors } = action.payload;
      state.signupErrors = errors;
    })
    .addCase(editProfile.fulfilled, (state, action) => {
      const { id, name, username, email, password } = action.payload;
      const user = allUsers.find(user => user.id === id);
      user.name = name;
      user.username = username;
      user.email = email;
      user.password = password;

      state.username = username;
      state.editErrors = undefined;
    })
    .addCase(editProfile.rejected, (state, action) => {
      const { errors } = action.payload;
      state.editErrors = errors;
    })
    .addCase(deleteAccount.fulfilled, (state, action) => {
      allUsers.filter(user => user.id !== action.payload.id);
    })
    // Authentication Reducers
    .addCase(login.fulfilled, (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.loginError = undefined;
    })
    .addCase(login.rejected, (state, action) => {
      const { error } = action.payload;
      state.loginError = error;
    })
  }
});

export default usersSlice.reducer;
export const { logout } = usersSlice.actions;
