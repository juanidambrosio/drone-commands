const isNumber = (value) => (/^\d+$/.test(value));

const isOneOfESON = (value) => /^[esonESON]{1}$/.test(value);

const isValid = (position) => {
  const { x, y, direction } = position;
  return isNumber(x) && isNumber(y) && (isOneOfESON(direction) || !direction);
};

const outOfBounds = (areaDefined, position) => {
  const { positionX, positionY } = position;
  const { x, y } = areaDefined;
  return positionX < 0 || positionX > x || positionY < 0 || positionY > y;
};

module.exports = {
  isValid,
  outOfBounds,
};
