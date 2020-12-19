import {useDispatch} from "react-redux"
import {Table,TableHead,TableRow,TableCell} from "react-toolbox/lib/table"
import {useSelector} from "react-redux"

import "./DataTable.scss"
import {getPoints} from "../../redux/slice/pointStoreSlice"
import {deleteAllPoints} from "../../service/request/point"
import {loadPoints} from "../../redux/slice/pointStoreSlice"

export default function DataTable() {
  const dispatch = useDispatch()

  const points = useSelector(getPoints)

  const handleClickButton = (e) => {
    e.preventDefault();

    deleteAllPoints().then(response => {
      if (response.ok) {
        dispatch(loadPoints([]))
        window.scrollTo(0,160)
      }
    })
  }

  return (
    <div className="DataTable">
      <div>
        <Table className="Tabular" selectable={false  }>
          <TableHead className="Head">
            <TableCell className="Cell" numeric><span>X</span></TableCell>
            <TableCell className="Cell" numeric><span>Y</span></TableCell>
            <TableCell className="Cell" numeric><span>R</span></TableCell>
            <TableCell className="Cell"><span>Status</span></TableCell>
            <TableCell className="Cell" numeric><span>Time</span></TableCell>
            <TableCell className="Cell" numeric><span>ExecTime</span></TableCell>
          </TableHead>
          {points.map((item, idx) => (
            <TableRow className="Row" key={idx}>
              <TableCell className="Cell" numeric><span>{item.x}</span></TableCell>
              <TableCell className="Cell" numeric><span>{item.y.toFixed(5)}</span></TableCell>
              <TableCell className="Cell" numeric><span>{item.r}</span></TableCell>
              <TableCell className="Cell" numeric>{item.status?<span id="g">Hit</span>:<span id="r">Fail</span>}</TableCell>
              <TableCell className="Cell" numeric><span>{item.history}</span></TableCell>
              <TableCell className="Cell" numeric><span>{item.duration}</span></TableCell>
            </TableRow>
          )).reverse()}
        </Table>
        <div className="ClearButton">
          <input type="button" value="Clear" onClick={handleClickButton}/>
        </div>
      </div>
    </div>
  )
}
