/* eslint-disable no-undef */
const sut = require('./droneActions');

describe('Drone Actions: ', () => {
  describe('rotate: ', () => {
    const rotateLeft = sut.rotate({ orientation: 'left', degrees: 90 });
    test('should rotate left from east to north', () => {
      expect(rotateLeft({ direction: 'E' })).toEqual({ direction: 'N' });
    });
    test('should rotate left from north to west', () => {
      expect(rotateLeft({ direction: 'N' })).toEqual({ direction: 'O' });
    });
    const rotateRight = sut.rotate({ orientation: 'right', degrees: 90 });
    test('should rotate right from east to south', () => {
      expect(rotateRight({ direction: 'E' })).toEqual({ direction: 'S' });
    });
    test('should rotate right from west to north', () => {
      expect(rotateRight({ direction: 'O' })).toEqual({ direction: 'N' });
    });
  });
  describe('move: ', () => {
    let initialPosition;
    beforeEach(() => {
      initialPosition = { positionX: 1, positionY: 1 };
    });

    const move = sut.move({ steps: 1 });

    test('should move to the right if direction is E', () => {
      const position = { ...initialPosition, direction: 'E' };
      expect(move(position)).toEqual({
        ...position,
        positionX: initialPosition.positionX += 1,
      });
    });
    test('should move to the left if direction is O', () => {
      const position = { ...initialPosition, direction: 'O' };
      expect(move(position)).toEqual({
        ...position,
        positionX: initialPosition.positionX -= 1,
      });
    });
    test('should move upwards if direction is N', () => {
      const position = { ...initialPosition, direction: 'N' };
      expect(move(position)).toEqual({
        ...position,
        positionY: initialPosition.positionY += 1,
      });
    });
    test('should move downwards if direction is S', () => {
      const position = { ...initialPosition, direction: 'S' };
      expect(move(position)).toEqual({
        ...position,
        positionY: initialPosition.positionY -= 1,
      });
    });
  });
});
