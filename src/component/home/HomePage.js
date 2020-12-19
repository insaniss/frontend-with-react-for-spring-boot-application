import {useState, useEffect} from "react"

import "./HomePage.scss"

export default function HomePage() {
  // hours
  const [hour1, setHour1] = useState()
  const [hour2, setHour2] = useState()
  // minutes
  const [minute1, setMinute1] = useState()
  const [minute2, setMinute2] = useState()
  // seconds
  const [second1, setSecond1] = useState()
  const [second2, setSecond2] = useState()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [day, setDay] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()

  useEffect(() => {
    window.scrollTo(0, 0)

    setInterval(() => {refreshClock()}, 1000)
    refreshClock();
  })

  const refreshClock = () => {
    let date = new Date()

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    setHour1(((hours-hours%10)/10).toFixed(0))
    setHour2((hours%10).toFixed(0))

    setMinute1(((minutes-minutes%10)/10).toFixed(0))
    setMinute2((minutes%10).toFixed(0))

    setSecond1(((seconds-seconds%10)/10).toFixed(0))
    setSecond2((seconds%10).toFixed(0))

    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
  }

  return (
    <div className="HomePage">
      <div>
        <div className="Clock">
          <span className="Digit">{hour1}</span>
          <span className="Digit">{hour2}</span>
          <span>:</span>
          <span className="Digit">{minute1}</span>
          <span className="Digit">{minute2}</span>
          <span>:</span>
          <span className="Digit">{second1}</span>
          <span className="Digit">{second2}</span>
        </div>
        <div className="Date">
          <span>{months[month]} {day}, {year}</span>
        </div>
      </div>
    </div>
  )
}
