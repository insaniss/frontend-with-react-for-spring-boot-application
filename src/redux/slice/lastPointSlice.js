import {createSlice} from "@reduxjs/toolkit"

export const lastPointSlice = createSlice({
  name: "lastPoint",
  initialState: {
    point: null
  },
  reducers: {
    setLastPoint: (state, action) => {
      state.point = action.payload
    }
  }
})

export const {setLastPoint} = lastPointSlice.actions
export const getLastPoint = state => state.lastPoint.point

export default lastPointSlice.reducer
