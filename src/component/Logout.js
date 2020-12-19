import React from 'react';
import {useDispatch} from 'react-redux';

import './Logout.scss';
import {setAuth} from '../redux/slice/authValueSlice';

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogoutAction = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setAuth(false));
  }

  return (
    <input className="LogoutButton" type="button" value="Logout"
           onClick={handleLogoutAction}/>
  )
}
