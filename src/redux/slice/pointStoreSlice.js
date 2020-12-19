import {createSlice} from "@reduxjs/toolkit"

export const pointStoreSlice = createSlice({
  name: "pointStore",
  initialState: {
    points: []
  },
  reducers: {
    loadPoints: (state, action) => {
      state.points = action.payload
    },
    addPoint: (state, action) => {
      state.points.push(action.payload)
    }
  }
})

export const {loadPoints, addPoint} = pointStoreSlice.actions
export const getPoints = state => state.pointStore.points

export default pointStoreSlice.reducer
