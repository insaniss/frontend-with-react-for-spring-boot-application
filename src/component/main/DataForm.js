import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Checkbox} from "react-toolbox/lib/checkbox"
import {Input} from "react-toolbox/lib/input"

import "./DataForm.scss"
import {getValueOfX, getValueOfY, getValueOfR} from "../../redux/slice/formStateSlice"
import {setValueOfX, setValueOfY, setValueOfR} from "../../redux/slice/formStateSlice"
import {isValidR, isValidX, isValidY, parse2float} from "../../service/validator/point"
import {addNewPoint} from "../../service/request/point"
import {addPoint} from "../../redux/slice/pointStoreSlice"
import {setLastPoint} from "../../redux/slice/lastPointSlice"

export default function DataForm() {
  const dispatch = useDispatch()

  const xVal = useSelector(getValueOfX)
  const yVal = useSelector(getValueOfY)
  const rVal = useSelector(getValueOfR)

  const [xValOk, setOkX] = useState(null)
  const [yValOk, setOkY] = useState(null)
  const [rValOk, setOkR] = useState(null)


  const validateValues = () => {
    setOkX(isValidX(xVal))
    setOkY(isValidY(yVal))
    setOkR(isValidR(rVal))
    return isValidX(xVal) && isValidY(yVal) && isValidR(rVal)
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()

    if (validateValues()) {
      addNewPoint(xVal, parse2float(yVal), rVal).then(response => {
        if (response.ok) {
          response.json().then(point => {
            dispatch(addPoint(point))
            dispatch(setLastPoint(point))
          })
        }
      })
    }
  }
  return (
    <div className="DataForm">
      <div id="form">
        <div className="Outer">
          <div className="Inner">
            <label htmlFor="checkbox1">Choose value of X</label>
            <div id="checkbox1" className="CheckBox">
              <Checkbox checked={xVal===-4} className="checkbox" label="-4" onChange={() => dispatch(setValueOfX(-4))}/>
              <Checkbox checked={xVal===-3} className="checkbox" label="-3" onChange={() => dispatch(setValueOfX(-3))}/>
              <Checkbox checked={xVal===-2} className="checkbox" label="-2" onChange={() => dispatch(setValueOfX(-2))}/>
              <Checkbox checked={xVal===-1} className="checkbox" label="-1" onChange={() => dispatch(setValueOfX(-1))}/>
              <Checkbox checked={xVal===-0} className="checkbox" label="0" onChange={() => dispatch(setValueOfX(0))}/>
              <Checkbox checked={xVal===1} className="checkbox" label="1" onChange={() => dispatch(setValueOfX(1))}/>
              <Checkbox checked={xVal===2} className="checkbox" label="2" onChange={() => dispatch(setValueOfX(2))}/>
              <Checkbox checked={xVal===3} className="checkbox" label="3" onChange={() => dispatch(setValueOfX(3))}/>
              <Checkbox checked={xVal===4} className="checkbox" label="4" onChange={() => dispatch(setValueOfX(4))}/>
            </div>
          </div>
          <div>{!xValOk && xValOk != null && <small>Value of X doesn't selected</small>}</div>
        </div>
        <div className="Outer">
          <div className="Inner">
            <label htmlFor="input">Enter value of Y (between -5 and 3)</label>
            <div id="input" className="Input">
              <Input type="text" maxLength={16} onChange={(a) => dispatch(setValueOfY(a))}/>
            </div>
          </div>
          <div>{!yValOk && yValOk != null && <small>Allowed only float from -5 to 3</small>}</div>
        </div>
        <div className="Outer">
          <div className="Inner">
            <label htmlFor="checkbox2">Choose value of R</label>
            <div id="checkbox2" className="CheckBox">
              <Checkbox checked={rVal===-4} className="checkbox" label="-4" onChange={() => dispatch(setValueOfR(-4))}/>
              <Checkbox checked={rVal===-3} className="checkbox" label="-3" onChange={() => dispatch(setValueOfR(-3))}/>
              <Checkbox checked={rVal===-2} className="checkbox" label="-2" onChange={() => dispatch(setValueOfR(-2))}/>
              <Checkbox checked={rVal===-1} className="checkbox" label="-1" onChange={() => dispatch(setValueOfR(-1))}/>
              <Checkbox checked={rVal===0} className="checkbox" label="0" onChange={() => dispatch(setValueOfR(0))}/>
              <Checkbox checked={rVal===1} className="checkbox" label="1" onChange={() => dispatch(setValueOfR(1))}/>
              <Checkbox checked={rVal===2} className="checkbox" label="2" onChange={() => dispatch(setValueOfR(2))}/>
              <Checkbox checked={rVal===3} className="checkbox" label="3" onChange={() => dispatch(setValueOfR(3))}/>
              <Checkbox checked={rVal===4} className="checkbox" label="4" onChange={() => dispatch(setValueOfR(4))}/>
            </div>
          </div>
          <div>{!rValOk && rValOk != null && <small>Value of X must be positive integer</small>}</div>
        </div>
        <div className="Inner">
          <div className="SubmitButton">
            <input type="button" value="Submit" onClick={handleSubmitClick}/>
          </div>
        </div>
      </div>
    </div>
  )
}
