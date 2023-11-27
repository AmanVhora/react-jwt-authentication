import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3001";

export const getPosts = createAsyncThunk('posts/getPosts', async (_, { rejectWithValue }) => {
  try {
    const response  = await axios.get(`${baseUrl}/posts`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  posts: []
};

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.postsError = undefined;
    })
    .addCase(getPosts.rejected, (state, action) => {
      const { error } = action.payload;
      state.postsError = error;
    })
  }
});

export default PostsSlice.reducer;
