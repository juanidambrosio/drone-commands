/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const readline = require('readline');
const util = require('util');
const { rotateLeft90, rotateRight90, move } = require('./droneActions');
const executeCommands = require('./execute');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      rl.close();
    }
  });
});

let droneNumber = 1;

const defineArea = async () => {
  const area = {};
  const answer = await question(`Define area to control for drone number ${droneNumber}:`);
  area.x = answer.charAt(0);
  area.y = answer.charAt(1);
  console.log(`AREA: ${area.x} ${area.y}`);
  return area;
};

const defineInitialPosition = async () => {
  const initialPosition = {};
  const answer = await question(`Define initial position for drone number ${droneNumber} (x,y coordinates and the orientation - e.g: 3 3 E):`);
  // if (!validInput(initialPosition, 'initialPosition')) {
  //   rl.write('Wrong format of the initial position, try again.');
  //   defineInitialPosition();
  // }
  const properties = ['positionX', 'positionY', 'direction'];
  for (const position in answer) {
    initialPosition[properties[position]] = answer.charAt(position);
  }
  console.log(`INITIAL POSITION: ${initialPosition.positionX} ${initialPosition.positionY} ${initialPosition.direction}`);
  return initialPosition;
};

const defineInstructions = async () => {
  const instructions = [];
  const answer = await question(`Define a set of consecutive instructions for the drone number ${droneNumber} (L to rotate left 90º, R to rotate right 90º or M to move forward 1 position):`);
  for (const position of answer) {
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

const addAnotherDrone = async () => {
  let response;
  const answer = await question(`Add drone number ${droneNumber + 1}? y for Yes, n for No:`);
  const answerTrimmed = answer.trim();
  switch (answerTrimmed) {
    case 'y':
      response = false;
      break;
    case 'n':
      response = true;
      break;
    default:
      return addAnotherDrone();
  }
  return response;
};

const start = async () => {
  let complete = false;
  const commands = [];
  const areaDefined = await defineArea();
  while (!complete) {
    const position = await defineInitialPosition();
    const instructions = await defineInstructions();
    commands.push({ position, instructions });
    complete = await addAnotherDrone();
    droneNumber += 1;
  }
  executeCommands(areaDefined, commands);
  rl.close();
};

start();
