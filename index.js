/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const readline = require('readline');
const util = require('util');
const { rotateLeft90, rotateRight90, move } = require('./droneActions');
const executeCommands = require('./execute');
const { isValid, outOfBounds } = require('./validators');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/)) {
      rl.close();
    }
  });
});

let droneNumber = 1;

const defineArea = async () => {
  const answer = await question('Define area to control for drones:');
  const [x, y] = answer.split(' ');
  if (!isValid({ x, y })) {
    console.error('\x1b[31m%s\x1b[0m', 'Wrong format of area, try again');
    return defineArea();
  }
  console.log(`AREA: ${x} ${y}`);
  return { x, y };
};

const defineInitialPosition = async (areaDefined) => {
  let initialPosition;
  const answer = await question(`Define initial position for drone number ${droneNumber} (x,y coordinates and the orientation - e.g: 3 3 E):`);
  const [x, y, direction] = answer.split(' ');
  if (!isValid({ x, y, direction }) || outOfBounds(areaDefined, { positionX: x, positionY: y })) {
    console.error('\x1b[31m%s\x1b[0m', 'Wrong format of initial position, try again');
    return defineInitialPosition(areaDefined);
  }
  console.log(`INITIAL POSITION: ${x} ${y} ${direction}`);
  return {
    positionX: parseInt(x, 10),
    positionY: parseInt(y, 10),
    direction: direction.toUpperCase(),
  };
};

const defineInstructions = async () => {
  const instructions = [];
  const answer = await question(`Define a set of consecutive instructions for the drone number ${droneNumber} (L to rotate left 90º, R to rotate right 90º or M to move forward 1 position):`);
  for (const position of answer.toUpperCase()) {
    switch (position) {
      case 'L':
        instructions.push(rotateLeft90);
        break;
      case 'R':
        instructions.push(rotateRight90);
        break;
      case 'M':
        instructions.push(move);
        break;
      default:
    }
  }
  return instructions;
};

const isComplete = async () => {
  const answer = await question(`Add drone number ${droneNumber + 1}? Y for Yes, N for No: \n`);
  const answerTrimmed = answer.trim().toUpperCase();
  switch (answerTrimmed) {
    case 'Y':
      return false;
    case 'N':
      return true;
    default:
      return isComplete();
  }
};

const start = async () => {
  const drones = [];
  const areaDefined = await defineArea();
  while (droneNumber) {
    const position = await defineInitialPosition(areaDefined);
    const instructions = await defineInstructions();
    drones.push({ position, instructions });
    droneNumber = await isComplete() ? undefined : droneNumber += 1;
  }
  executeCommands(areaDefined, drones);
  rl.close();
};

start();
