import {configureStore} from '@reduxjs/toolkit';

import authValueSlice from './slice/authValueSlice.js';

export default configureStore({
  reducer: {
    authValue: authValueSlice
  }
});