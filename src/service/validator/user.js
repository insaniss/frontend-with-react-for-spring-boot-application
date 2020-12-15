const regularExpression = "^[A-Za-z0-9_]{3,14}$";

// validates a username
export function isValidUsername(username) {
  return !!(username !== '' && username.match(regularExpression));
}

// validates a password
export function isValidPassword(password) {
  return password.length >= 4;
}

// validates a confirmation password
export function areEqual(password1, password2) {
  return password1 === password2 & '' !== password2;
}
