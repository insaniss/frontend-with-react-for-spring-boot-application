import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {useSelector} from "react-redux"

import "./Content.scss"
import HomePage from "./home/HomePage"
import MainPage from "./main/MainPage"
import {selectAuth} from "../redux/slice/authValueSlice"

export default function Content() {
  const authValue = useSelector(selectAuth)

  return (
    <div className="Content">
      <Switch>
        <Route exact path={["/","/home"]}>
          <HomePage />
        </Route>
        <Route path="/main">
          {authValue ? <MainPage/> : <Redirect to="/home"/>}
        </Route>
      </Switch>
    </div>
  )
}
