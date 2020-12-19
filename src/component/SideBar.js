import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import './SideBar.scss';
import ReactLogo from '../logotype/react.svg';
import GithubLogo from '../logotype/github.svg';
import {Login} from './Login';
import {Register} from './Register';
import Logout from './Logout'
import {selectAuth} from '../redux/slice/authValueSlice';

// sidebar component
export default function SideBar() {
  const sideBar = useRef();
  const loginForm = useRef();
  const registerForm = useRef()

  const authValue = useSelector(selectAuth);

  // sets form visibility
  const setFormVisibility = (formName, visibility) => {
    switch (formName) {
      case "login":
        if (loginForm !== undefined && loginForm.current != null)
          loginForm.current.style.display = visibility;
        break;
      case "register":
        if (registerForm !== undefined && registerForm.current != null)
          registerForm.current.style.display = visibility;
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollWindow);
    return () => {
      window.removeEventListener('scroll', scrollWindow);
    }
  }, []);

  // the private method, which scrolls sidebar
  const scrollWindow = () => {
    let length = 16 + window.pageYOffset;

    // if sidebar value non-null
    if (sideBar !== undefined && sideBar.current != null) {
      length -= sideBar.current.offsetTop;
      sideBar.current.style.paddingTop = length + 'px';
    }
  }

  // link to the sources
  const sourceCode = "https://github.com/crazifoo/frontend-with-react-for-spring-boot-application";

  return (
    <div className="SideBar" ref={sideBar}>
      <div>
        <img src={ReactLogo} alt="react"/>
        <div className="NavBar">
          <Link className={'link'} to="/home">Home</Link>
          {authValue && <Link className={'link'} to="/main">Main</Link>}
        </div>
        {!authValue ?
          <div className="Auth">
            <Login setFormVisibility={setFormVisibility} ref={loginForm}/>
            <Register setFormVisibility={setFormVisibility} ref={registerForm}/>
          </div> :
          <div className="Auth"><Logout/></div>}
        <a className="Github" href={sourceCode} target="_blank">
          <img src={GithubLogo} alt="github"/>
        </a>
      </div>
    </div>
  )
}
