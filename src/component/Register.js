import React from 'react';
import {Input} from 'react-toolbox/lib/input';

import './Register.scss';
import {isValidUsername} from '../service/validator/user';
import {isValidPassword} from '../service/validator/user';
import {areEqual} from '../service/validator/user';
import {register} from '../service/request/user';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerForm = React.createRef();
    this.registerMessage = React.createRef();

    this.state = {
      username1: "", username1Ok: null,
      password1: "", password1Ok: null,
      password2: "", password2Ok: null
    }
  }

  validateValues = () => {
    this.setState({
      username1: this.state.username1, username1Ok: isValidUsername(this.state.username1),
      password1: this.state.password1, password1Ok: isValidPassword(this.state.password1),
      password2: this.state.password2, password2Ok: areEqual(this.state.password1, this.state.password2)
    })
    return isValidUsername(this.state.username1) && isValidPassword(this.state.password1)
      && areEqual(this.state.password1, this.state.password2);
  }


  handleRegisterSubmit = (e) => {
    e.preventDefault();
    this.registerMessage.current.innerHTML = '';

    if (this.validateValues()) {
      register(this.state.username1, this.state.password1).then(response => {
        if (response.status === 200) {
          response.text().then(token => {localStorage.setItem("auth", token);});
          this.hideRegisterForm();
        } else if (response.status === 409) {
          response.text().then(text => {this.registerMessage.current.innerHTML = text;});
        } else {
          this.registerMessage.current.innerHTML = "Something went wrong, please try again";
        }
      });
    }
  }

  handleUsername1Change = (username1) => {
    this.setState({
      username1: username1, username1Ok: this.state.username1Ok,
      password1: this.state.password1, password1Ok: this.state.password1Ok,
      password2: this.state.password2, password2Ok: this.state.password2Ok
    });
  }
  handlePassword1Change = (password1) => {
    this.setState({
      username1: this.state.username1, username1Ok: this.state.username1Ok,
      password1: password1, password1Ok: this.state.password1Ok,
      password2: this.state.password2, password2Ok: this.state.password2Ok
    });
  }
  handlePassword2Change = (password2) => {
    this.setState({
      username1: this.state.username1, username1Ok: this.state.username1Ok,
      password1: this.state.password1, password1Ok: this.state.password1Ok,
      password2: password2, password2Ok: this.state.password2Ok
    });
  }

  setStateNull = () => {
    this.registerMessage.current.innerHTML = '';
    this.setState({
      username1: "", username1Ok: null,
      password1: "", password1Ok: null,
      password2: "", password2Ok: null
    })
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
      this.setStateNull();
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
            <input type="button" value="X" onClick={this.hideRegisterForm}/>
            <div className="FormGroup">
              <span className={'title'}>Register</span>
            </div>
            <div className="FormGroup">
              <label htmlFor="username1">Username</label>
              <Input id="username1" type="text" value={this.state.username1}
                     autoComplete="off" onChange={e => this.handleUsername1Change(e)}/>
              {
                !this.state.username1Ok && this.state.username1Ok != null &&
                  <small>Allowed only letters, numbers and underscores</small>
              }
            </div>
            <div className="FormGroup">
              <label htmlFor="password1">Password</label>
              <Input id="password1" type="password" value={this.state.password1}
                     feedback="false" onChange={e => this.handlePassword1Change(e)}/>
              {
                !this.state.password1Ok && this.state.password1Ok != null &&
                  <small>Password must be at least 4 characters long</small>
              }
            </div>
            <div className="FormGroup">
              <label htmlFor="password2">Confirm password</label>
              <Input id="password2" type="password" value={this.state.password2}
                     feedback="false" onChange={e => this.handlePassword2Change(e)}/>
              {
                !this.state.password2Ok && this.state.password2Ok != null &&
                  <small>Confirmation password mismatched</small>
              }
            </div>
            <div className="FormGroup">
              <label id="last" htmlFor="continue" ref={this.registerMessage}/>
              <input id="continue1" type="button" value="Continue" onClick={this.handleRegisterSubmit}/>
            </div>
            <p>Already have an account? <span onClick={this.redirect}>Login</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
