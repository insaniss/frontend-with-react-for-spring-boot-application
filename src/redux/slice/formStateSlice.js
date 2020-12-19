import {createSlice} from "@reduxjs/toolkit";

export const formStateSlice = createSlice({
  name: "formState",
  initialState: {
    point: {
      x: null,
      y: null,
      r: 2
    }
  },
  reducers: {
    setValueOfX: (state, action) => {
      state.point.x = action.payload
    },
    setValueOfY: (state, action) => {
      state.point.y = action.payload
    },
    setValueOfR: (state, action) => {
      state.point.r = action.payload
    }
  }
})

export const {setValueOfX, setValueOfY, setValueOfR} = formStateSlice.actions

export const getValueOfX = state => state.formState.point.x
export const getValueOfY = state => state.formState.point.y
export const getValueOfR = state => state.formState.point.r

export default formStateSlice.reducer
