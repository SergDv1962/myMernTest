import { configureStore } from '@reduxjs/toolkit';
import authSlice from './feature/auth/authSlice.js'
import postSlice from './feature/post/postSlice.js';
import commentSlice from './feature/comment/commentSlice.js';


export const store = configureStore({
   reducer: {
      auth: authSlice,
      post: postSlice,
      comment: commentSlice,
   },
})