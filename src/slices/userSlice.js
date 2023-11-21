import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  currentUser: {}
};
const baseUrl = "http://localhost:3001";

export const allUsers = createAsyncThunk('users/allUsers', async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data
});

export const createAccount = createAsyncThunk('users/createAccount', async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, data)
    return response.data  
  } catch (error) {
    console.error('Request failed: ', error.message);
  }  
});

export const profile = createAsyncThunk('users/profile', async ({ id, token }) => {
  try {
    const response = await axios.get(`${baseUrl}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data  
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized User: ', error);
    } else {
      console.error('Request failed: ', error);
    }
  }
});

export const editProfile = createAsyncThunk('users/editProfile', async ({ id, token, user }) => {
  try {
    const response = await axios.put(`${baseUrl}/users/${id}`, user, {
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
    })
    return response.data  
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized User: ', error);
    } else {
      console.error('Request failed: ', error);
    }
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeCurrentUser: (state) => {
      state.currentUser = {}
    }
  },
  extraReducers: builder => {
    builder.addCase(allUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
    .addCase(createAccount.fulfilled, (state, action) => {
      state.users.push(action.payload)
    })
    .addCase(profile.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    .addCase(editProfile.fulfilled, (state, action) => {
      console.log(action.payload);
    })
    .addCase(deleteAccount.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id)
      console.log(action.payload);
    })
  }
});

export const getCurrentUser = (state) => state.users.users.find(user => user.username === state.auth.username);

export default usersSlice.reducer;
export const { removeCurrentUser } = usersSlice.actions;
