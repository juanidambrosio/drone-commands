const isNumber = (value) => (/^\d+$/.test(value));

const isOneOfESON = (value) => /^[esonESON]{1}$/.test(value);

const isPositionValid = (position) => {
  const { positionX, positionY, direction } = position;
  return isNumber(positionX) && isNumber(positionY) && isOneOfESON(direction);
};

const isAreaValid = (area) => {
  const { x, y } = area;
  return isNumber(x) && isNumber(y);
};

module.exports = {
  isPositionValid,
  isAreaValid,
};
