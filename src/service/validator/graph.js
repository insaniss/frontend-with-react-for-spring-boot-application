
//============================================================

export function fixedX(x, min, max) {
  return Math.round(x) < min ? min : Math.round > max ? max : Math.round(x)
}

export function fixedY(y, min, max) {
  return y < min ? min : y > max ? max : y
}

//============================================================

export function pixelX(x, radius) {
  return (160 * x) / radius + 200;
}

export function pixelY(y, radius) {
  return 200 - (160 * y) / radius;
}

//============================================================
