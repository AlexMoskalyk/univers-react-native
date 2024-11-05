import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authentication/authSlice";
import { postReducer } from "../reducers/posts/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

export default rootReducer;
