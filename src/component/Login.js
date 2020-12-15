import React from 'react';
import {Input} from 'react-toolbox/lib/input';

import './Login.scss';
import {isValidUsername} from '../service/validator/user';
import {isValidPassword} from '../service/validator/user';
import {login} from '../service/request/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginForm = React.createRef();
    this.loginMessage = React.createRef();

    this.state = {
      username: "", usernameOk: null,
      password: "", passwordOk: null
    }
  }


  validateValues = () => {
    this.setState({
      username: this.state.username, usernameOk: isValidUsername(this.state.username),
      password: this.state.password, passwordOk: isValidPassword(this.state.password)
    })
    return isValidUsername(this.state.username) && isValidPassword(this.state.password);
  }


  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.loginMessage.current.innerHTML = '';

    if (this.validateValues()) {
      login(this.state.username, this.state.password).then(response => {
        if (response.status === 200) {
          response.text().then(token => {localStorage.setItem("auth", token)});
          this.hideLoginForm();
        } else if (response.status === 401) {
          response.text().then(text => {this.loginMessage.current.innerHTML = text});
        } else {
          this.registerMessage.current.innerHTML = "Something went wrong, please try again";
        }
      });
    }
  }


  handleUsernameChange = (username) => {
    this.setState({
      username: username, usernameOk: this.state.usernameOk,
      password: this.state.password, passwordOk: this.state.passwordOk
    });
  }
  handlePasswordChange = (password) => {
    this.setState({
      username: this.state.username, usernameOk: this.state.usernameOk,
      password: password, passwordOk: this.state.passwordOk
    });
  }

  setStateNull = () => {
    this.loginMessage.current.innerHTML = '';
    this.setState({
      username: "", usernameOk: null,
      password: "", passwordOk: null
    })
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
      this.setStateNull();
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
            <input type="button" value="X" onClick={this.hideLoginForm}/>
            <div className="FormGroup">
              <span className={'title'}>Login</span>
            </div>
            <div className="FormGroup">
              <label htmlFor="username">Username</label>
              <Input id="username" type="text" value={this.state.username}
                     autoComplete="off" onChange={e => this.handleUsernameChange(e)}/>
              {
                !this.state.usernameOk && this.state.usernameOk != null &&
                  <small>Allowed only letters, numbers and underscores</small>
              }       
            </div>
            <div className="FormGroup">
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" value={this.state.password}
                     feedback="false" onChange={e => this.handlePasswordChange(e)}/>
              {
                !this.state.passwordOk && this.state.passwordOk != null &&
                  <small>Password must be at least 4 characters long</small>
              }
            </div>
            <div className="FormGroup">
              <label id="last" htmlFor="continue" ref={this.loginMessage}/>
              <input id="continue" type="button" value="Continue" onClick={this.handleLoginSubmit}/>
            </div>
            <p>Don't have an account? <span onClick={this.redirect}>Register</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
