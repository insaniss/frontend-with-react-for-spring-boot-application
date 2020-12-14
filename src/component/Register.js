import React from 'react';
import {Input} from 'react-toolbox/lib/input';

import './Register.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerForm = React.createRef();
  }

  // shows display of register form
  showRegisterForm = () => {
    if (this.registerForm !== undefined && this.registerForm.current != null) {
      this.registerForm.current.style.display = "block";
    }
  }
  // hides display of register form
  hideRegisterForm = () => {
    if (this.registerForm !== undefined && this.registerForm.current != null) {
      this.registerForm.current.style.display = "none";
    }
  }

  redirect = () => {
    this.hideRegisterForm();
    this.props.loginForm();
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
    return(
      <div>
        <input className="RegisterButton" type="button" value="Register" onClick={this.showRegisterForm}/>
        <div className="RegisterForm" ref={this.registerForm}>
          <div className="Form">
            <input type="button" value="x" onClick={this.hideRegisterForm}/>
            <div className="FormGroup">
              <span className={'title'}>Register</span>
            </div>
            <div className="FormGroup">
              <label htmlFor="username1">Username</label>
              <Input id="username1" type="text" autoComplete="off"/>
            </div>
            <div className="FormGroup">
              <label htmlFor="password1">Password</label>
              <Input id="password1" type="password" autoComplete="off"/>
            </div>
            <div className="FormGroup">
              <label htmlFor="password2">Confirm password</label>
              <Input id="password2" type="password" autoComplete="off"/>
            </div>
            <div className="FormGroup">
              <label htmlFor="continue">...</label>
              <input id="continue1" type="button" value="Continue"/>
            </div>
            <p>Already have an account? <span onClick={this.redirect}>Login</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
