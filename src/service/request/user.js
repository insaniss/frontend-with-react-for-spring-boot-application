import {backendHost} from '../configuration/host';

export function login(username, password) {
  return fetch(`${backendHost}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "username": username,
          "password": password
        }
      )
    }
  );
}

export function register(username, password) {
  return fetch(`${backendHost}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "username": username,
          "password": password
        }
      )
    }
  );
}

