import {configureStore} from "@reduxjs/toolkit"

import authValueReducer from "./slice/authValueSlice"
import formStateReducer from "./slice/formStateSlice"
import pointStoreReducer from "./slice/pointStoreSlice"
import lastPointReducer from "./slice/lastPointSlice"

export default configureStore({
  reducer: {
    authValue: authValueReducer,
    formState: formStateReducer,
    pointStore: pointStoreReducer,
    lastPoint: lastPointReducer
  }
});