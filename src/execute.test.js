/* eslint-disable no-undef */
const {
  dronesTest1, finalDrone1Ok, finalDrone2Ok,
} = require('./mocks/drones');

const sut = require('./execute');

describe('Execute Commands', () => {
  const areaDefined = { x: 10, y: 10 };
  test('should complete every drone movement', () => {
    const dronesFinalPosition = sut(areaDefined, dronesTest1);
    expect(dronesFinalPosition).toEqual([finalDrone1Ok, finalDrone2Ok]);
  });
});
