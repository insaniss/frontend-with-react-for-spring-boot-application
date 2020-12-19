const regularExpression = /^[+-]?\d+(\.\d+)?$/

export function isValidX(x) {
  return (x != null)
}

export function isValidY(y) {
  let yVal = parse2float(y)
  return (yVal != null && yVal >= -5 && yVal <= 3)
}

export function isValidR(r) {
  return (r != null && r > 0)
}

export function parse2float(val) {
  if (val == null || val.trim() === '') return null

  let float = val.trim().replace(',', '.')

  if (regularExpression.test(float)) {
    return parseFloat(float)
  }
  return null
}
