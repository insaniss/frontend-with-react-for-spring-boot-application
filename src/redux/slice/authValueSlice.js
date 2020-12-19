import {createSlice} from "@reduxjs/toolkit";

export const authValueSlice = createSlice({
  name: "authValue",
  initialState: {
    auth: !!localStorage.getItem("auth")
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload
    }
  }
});

export const {setAuth} = authValueSlice.actions
export const selectAuth = state => state.authValue.auth

export default authValueSlice.reducer
