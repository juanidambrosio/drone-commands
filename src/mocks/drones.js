const { rotate, move } = require('../droneActions');

const rotateLeft = rotate({ orientation: 'left', degrees: 90 });
const move1 = move({ steps: 1 });

const drone1Position = { positionX: 0, positionY: 0, direction: 'E' };
const drone2Position = { positionX: 10, positionY: 10, direction: 'O' };
const drone1Instructions = {
  ok: [move1, move1, move1],
  outOfBounds: [rotateLeft, rotateLeft, move],
};

const drone2Instructions = {
  ok: [rotateLeft, move1, move1],
  outOfBounds: [rotateLeft, rotateLeft, move],
};

const dronesTest1 = [
  {
    position: drone1Position,
    instructions: drone1Instructions.ok,
  },
  {
    position: drone2Position,
    instructions: drone2Instructions.ok,
  },
];

const finalDrone1Ok = { positionX: 3, positionY: 0, direction: 'E' };
const finalDrone2Ok = { positionX: 10, positionY: 8, direction: 'S' };

module.exports = {
  dronesTest1, finalDrone1Ok, finalDrone2Ok,
};
