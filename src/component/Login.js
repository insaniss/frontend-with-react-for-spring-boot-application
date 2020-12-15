import React, {useState} from 'react';
import {Input} from 'react-toolbox/lib/input';

import './Login.scss';
import {isValidUsername} from '../service/validator/user';
import {isValidPassword} from '../service/validator/user';
import {login} from '../service/request/user';

export const Login = React.forwardRef((props, ref) => {

  const [username, setUsername] = useState('');
  const [usernameOk, setUsernameOk] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordOk, setPasswordOk] = useState(null);
  const [message, setMessage] = useState('');

  const validateValues = () => {
    setUsernameOk(isValidUsername(username));
    setPasswordOk(isValidPassword(password));
    return isValidUsername(username) && isValidPassword(password);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setMessage('');
    if (validateValues()) {
      login(username, password).then(response => {
        if (response.status === 200) {
          response.text().then(token => {
            localStorage.setItem("auth", token);
            hideLoginForm();
          });
        } else if (response.status === 401) {
          response.text().then(text => {setMessage(text)});
        } else {
          setMessage("Something went wrong, please try again");
        }
      });
    }
  }

  const setAllInitialValue = () => {
    setUsername('');
    setUsernameOk(null);
    setPassword('');
    setPasswordOk(null);
    setMessage('');
  }

  const showLoginForm = () => {
    props.setFormVisibility("login", "block");
  }
  const hideLoginForm = () => {
    props.setFormVisibility("login", "none");
    setAllInitialValue();
  }
  const redirectToRegister = () => {
    props.setFormVisibility("register", "block");
    hideLoginForm();
  }

  return (
    <div>
      <input className="LoginButton" type="button" value="Login" onClick={showLoginForm}/>
      <div className="LoginForm" ref={ref}>
        <div className="Form">
          <input type="button" value="x" onClick={hideLoginForm}/>
          <div className="FormGroup">
            <span>Login</span>
          </div>
          <div className="FormGroup">
            {
              !usernameOk && usernameOk != null &&
              <small>Allowed only letters, numbers and underscores</small>
            }
            <Input type="text" placeholder="username" autoComplete="off"
                   value={username} onChange={username => setUsername(username)}/>
          </div>
          <div className="FormGroup">
            {
              !passwordOk && passwordOk != null &&
              <small>Password must be at least 4 characters long</small>
            }
            <Input type="password" placeholder="password" feedback="false"
                   value={password} onChange={password => setPassword(password)}/>
          </div>
          <div className="FormGroup">
            <small>{message}</small>
            <input type="button" value="Continue" onClick={handleLoginSubmit}/>
          </div>
          <p>Don't have an account? <span onClick={redirectToRegister}>Register</span></p>
        </div>
      </div>
    </div>
  )
})
