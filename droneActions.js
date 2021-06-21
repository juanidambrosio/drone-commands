const calculateIndex = (orientation, direction, movingPositions) => {
  const directions = ['N', 'E', 'S', 'O'];
  if (orientation === 'left') {
    const index = directions.indexOf(direction) - movingPositions;
    return index >= 0 ? directions[index] : directions[directions.length + index];
  }
  const index = directions.indexOf(direction) + movingPositions;
  return index <= index.length ? directions[index] : directions[index - directions.length];
};

const rotate = (options) => (position) => {
  let { direction } = position;
  const { orientation, degrees } = options;
  const movingPositions = degrees / 90;
  direction = calculateIndex(orientation, direction, movingPositions);
  return { ...position, direction };
};

const move = (options) => (position) => {
  const { direction } = position;
  let { positionX, positionY } = position;
  const { steps } = options;

  switch (direction) {
    case 'E':
      positionX += steps;
      break;
    case 'S':
      positionY -= steps;
      break;
    case 'O':
      positionX -= steps;
      break;
    case 'N':
      positionY += steps;
      break;
    default:
  }
  return { ...position, positionX, positionY };
};

module.exports = {
  rotate,
  move,
};
