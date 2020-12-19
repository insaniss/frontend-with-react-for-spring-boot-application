import {backendHost} from "../configuration/host"

export function getAllPoints() {
  return fetch(`${backendHost}/points/get-all`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer:" + localStorage.getItem("auth")
      }
    }
  )
}

export function addNewPoint(x, y, r) {
  return fetch(`${backendHost}/points/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer:" + localStorage.getItem("auth")
      },
      body: JSON.stringify(
        {
          "x": x,
          "y": y,
          "r": r
        }
      )
    }
  )
}

export function deleteAllPoints() {
  return fetch(`${backendHost}/points/delete-all`,
    {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer:" + localStorage.getItem("auth")
      }
    }
  )
}
