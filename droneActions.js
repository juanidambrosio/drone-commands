const rotateLeft90 = (position) => {
  let { direction } = position;
  switch (direction) {
    case 'E':
      direction = 'N';
      break;
    case 'S':
      direction = 'E';
      break;
    case 'O':
      direction = 'S';
      break;
    case 'N':
      direction = 'O';
      break;
    default:
  }
  return { ...position, direction };
};

const rotateRight90 = (position) => {
  let { direction } = position;
  switch (direction) {
    case 'E':
      direction = 'S';
      break;
    case 'S':
      direction = 'O';
      break;
    case 'O':
      direction = 'N';
      break;
    case 'N':
      direction = 'E';
      break;
    default:
  }
  return { ...position, direction };
};

const move = (position) => {
  let { positionX, positionY, direction } = position;

  switch (direction) {
    case 'E':
      positionX += 1;
      break;
    case 'S':
      positionY -= 1;
      break;
    case 'O':
      positionX -= 1;
      break;
    case 'N':
      positionY += 1;
      break;
    default:
  }
  console.log(position);
  return { ...position, positionX, positionY };
};

module.exports = {
  rotateLeft90,
  rotateRight90,
  move,
};
