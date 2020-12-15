import React, {useState, forwardRef} from 'react';
import {Input} from 'react-toolbox/lib/input';

import './Register.scss';
import {isValidUsername} from '../service/validator/user';
import {isValidPassword} from '../service/validator/user';
import {areEqual} from '../service/validator/user';
import {register} from '../service/request/user';

export const Register = forwardRef((props, ref) => {

  const [username1, setUsername1] = useState('');
  const [username1Ok, setUsername1Ok] = useState(null);
  const [password1, setPassword1] = useState('');
  const [password1Ok, setPassWord1Ok] = useState(null);
  const [password2, setPassword2] = useState('');
  const [password2Ok, setPassWord2Ok] = useState(null);
  const [message, setMessage] = useState('');

  const validateValues = () => {
    setUsername1Ok(isValidUsername(username1));
    setPassWord1Ok(isValidPassword(password1));
    setPassWord2Ok(areEqual(password1, password2));
    return isValidUsername(username1) && isValidPassword(password1) && areEqual(password1, password2);
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setMessage('');
    if (validateValues()) {
      register(username1, password1).then(response => {
        if (response.status === 200) {
          response.text().then(token => {
            localStorage.setItem("auth", token);
            hideRegisterForm();
          });
        } else if (response.status === 409) {
          response.text().then(text => {setMessage(text)});
        } else {
          setMessage("Something went wrong, please try again");
        }
      });
    }
  }

  const setAllInitialValue = () => {
    setUsername1('');
    setUsername1Ok(null);
    setPassword1('');
    setPassWord1Ok(null);
    setPassword2('');
    setPassWord2Ok(null);
    setMessage('');
  }

  const showRegisterForm = () => {
    props.setFormVisibility("register", "block");
  }
  const hideRegisterForm = () => {
    props.setFormVisibility("register", "none");
    setAllInitialValue();
  }
  const redirectToLogin = () => {
    props.setFormVisibility("login", "block");
    hideRegisterForm();
  }

  return (
    <div>
      <input className="RegisterButton" type="button" value="Register" onClick={showRegisterForm}/>
      <div className="RegisterForm" ref={ref}>
        <div className="Form">
          <input type="button" value="x" onClick={hideRegisterForm}/>
          <div className="FormGroup">
            <span>Register</span>
          </div>
          <div className="FormGroup">
            {
              !username1Ok && username1Ok != null &&
              <small>Allowed only letters, numbers and underscores</small>
            }
            <Input type="text" placeholder="username" autoComplete="off"
                   value={username1} onChange={username => setUsername1(username)}/>
          </div>
          <div className="FormGroup">
            {
              !password1Ok && password1Ok != null &&
              <small>Password must be at least 4 characters long</small>
            }
            <Input type="password" placeholder="password" feedback="false"
                   value={password1} onChange={password => setPassword1(password)}/>
          </div>
          <div className="FormGroup">
            {
              !password2Ok && password2Ok != null &&
              <small>Confirmation password mismatched</small>
            }
            <Input type="password" placeholder="confirm password" feedback="false"
                   value={password2} onChange={password => setPassword2(password)}/>
          </div>
          <div className="FormGroup">
            <small>{message}</small>
            <input id="register" type="button" value="Continue" onClick={handleRegisterSubmit}/>
          </div>
          <p>Already have an account? <span onClick={redirectToLogin}>Login</span></p>
        </div>
      </div>
    </div>
  )
})
