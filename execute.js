/* eslint-disable no-restricted-syntax */
const { outOfBounds } = require('./validators');

const executeCommands = (areaDefined, drones) => {
  drones.forEach((drone, index) => {
    const { instructions } = drone;
    let { position } = drone;

    for (const instruction of instructions) {
      position = instruction(position);
      if (outOfBounds(areaDefined, position)) {
        position = undefined;
        break;
      }
    }
    console.log(`Drone number ${index + 1}: ${position ? `${position.positionX} ${position.positionY} ${position.direction}` : 'Out of bounds'}`);
  });
};

module.exports = executeCommands;
