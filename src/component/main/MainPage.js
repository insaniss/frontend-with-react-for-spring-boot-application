import {useEffect} from "react"
import {useDispatch} from "react-redux"

import "./MainPage.scss"
import GraphForm from "./GraphForm"
import DataTable from "./DataTable"
import {getAllPoints} from "../../service/request/point"
import {loadPoints} from "../../redux/slice/pointStoreSlice"
import {setLastPoint} from "../../redux/slice/lastPointSlice"
import DataForm from "./DataForm"
import {setAuth} from "../../redux/slice/authValueSlice";

export default function MainPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    getAllPoints().then(response => {
      if (response.ok) {
        response.json().then(points => {
          dispatch(loadPoints(points))
          if (points.length > 0)
            dispatch(setLastPoint(points[points.length-1]))
          else
            dispatch(setLastPoint(null))
        })
      } else {
          localStorage.clear();
          dispatch(setAuth(false));
      }
    })
  }, [dispatch])

  return (
    <div className="MainPage">
      <label htmlFor="graphForm">Graph</label>
      <GraphForm id="graphForm"/>
      <label htmlFor="dataForm">Add new point</label>
      <DataForm id="dataForm"/>
      <label htmlFor="dataTable">Table of point data</label>
      <DataTable id="dataTable"/>
    </div>
  )
}
