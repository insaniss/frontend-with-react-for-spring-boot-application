import React from 'react';
import {Link} from 'react-router-dom';

import './SideBar.scss';
import ReactLogo from '../logotype/react.svg';
import GithubLogo from '../logotype/github.svg';
import Login from './Login';
import Register from './Register';
import Logout from "./Logout";

// sidebar component
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.sideBar = React.createRef();
  }

  // the private method, which scrolls sidebar
  #scrollWindow = () => {
    let length = 16 + window.pageYOffset;

    // if sidebar value non-null
    if (this.sideBar !== undefined && this.sideBar.current != null) {
      length -= this.sideBar.current.offsetTop;
      this.sideBar.current.style.paddingTop = length + 'px';
    }
  }

  showLoginForm = () => {
    this.login.showLoginForm();
  }
  showRegisterForm = () => {
    this.register.showRegisterForm();
  }

  // react lifecycle method run after the mounting of component
  componentDidMount() {
    window.addEventListener('scroll', this.#scrollWindow);
  }
  // react lifecycle method run before the mounting of component
  componentWillUnmount() {
    window.addEventListener('scroll', this.#scrollWindow);
  }

  // link to the sources
  #sourceCode = "https://github.com/crazifoo/frontend-with-react-for-spring-boot-application";

  render() {
    return (
      <div className="SideBar" ref={this.sideBar}>
        <div>
          <img src={ReactLogo} alt="react"/>
          <div className="NavBar">
            <Link className={'link'} to="/home">Home</Link>
            <Link className={'link'} to="/main">Main</Link>
          </div>
          {
            localStorage.getItem("auth") ?
              <div className="Auth">
                <Login registerForm={this.showRegisterForm} onRef={ref => (this.login = ref)}/>
                <Register loginForm={this.showLoginForm} onRef={ref => (this.register = ref)}/>
              </div> :
              <div className="Auth">
                <Logout />
              </div>
          }
          <a className="Github" href={this.#sourceCode} target="_blank">
            <img src={GithubLogo} alt="github"/>
          </a>
        </div>
      </div>
    )
  }
}

export default SideBar;
