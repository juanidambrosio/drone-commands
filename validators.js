const isNumber = (value) => (/^[0-9]+/.test(value));

const isOneOfESON = (value) => /^[esonESON]{1}$/.test(value);

const isValidArea = (area) => {
  const { x, y } = area;
  return isNumber(x) && isNumber(y);
};

const isValidPosition = (position) => {
  const { positionX, positionY, direction } = position;
  return isNumber(positionX) && isNumber(positionY) && isOneOfESON(direction);
};

const outOfBounds = (areaDefined, position) => {
  const { positionX, positionY } = position;
  const { x, y } = areaDefined;
  return positionX < 0 || positionX > x || positionY < 0 || positionY > y;
};

module.exports = {
  isValidArea,
  isValidPosition,
  outOfBounds,
};
