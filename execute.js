/* eslint-disable max-len */
const executeCommands = (areaDefined, commands) => {
  commands.forEach((command) => {
    const { position, instructions } = command;
    const finalPosition = instructions.reduce((accumulator, currentInstruction) => currentInstruction(accumulator), position);
    console.log(`${finalPosition.positionX}${finalPosition.positionY}${finalPosition.direction}`);
  });
};

module.exports = executeCommands;
