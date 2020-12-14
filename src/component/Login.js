import React from 'react';
import {Input} from 'react-toolbox/lib/input';

import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginForm = React.createRef();
  }

  // shows display of login form
  showLoginForm = () => {
    if (this.loginForm !== undefined && this.loginForm.current != null) {
      this.loginForm.current.style.display = "block";
    }
  }

  // hides display of login form
  hideLoginForm = () => {
    if (this.loginForm !== undefined && this.loginForm.current != null) {
      this.loginForm.current.style.display = "none";
    }
  }

  redirect = () => {
    this.hideLoginForm();
    this.props.registerForm();
  }

  // react lifecycle method run after the mounting of component
  componentDidMount() {
    this.props.onRef(this);
  }
  // react lifecycle method run before the mounting of component
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <div>
        <input className="LoginButton" type="button" value="Login" onClick={this.showLoginForm}/>
        <div className="LoginForm" ref={this.loginForm}>
          <div className="Form">
            <input type="button" value="x" onClick={this.hideLoginForm}/>
            <div className="FormGroup">
              <span className={'title'}>Login</span>
            </div>
            <div className="FormGroup">
              <label htmlFor="username">Username</label>
              <Input id="username" type="text" autoComplete="off"/>
            </div>
            <div className="FormGroup">
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" autoComplete="off"/>
            </div>
            <div className="FormGroup">
              <label htmlFor="continue">...</label>
              <input id="continue" type="button" value="Continue"/>
            </div>
            <p>Don't have an account? <span onClick={this.redirect}>Register</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
