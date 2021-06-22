/* eslint-disable no-undef */
const sut = require('./validators');

describe('Validators: ', () => {
  describe('isValidArea: ', () => {
    test('should return false if the area is not represented by numbers', () => {
      expect(sut.isValidArea({ x: 'a', y: 'b' })).toBe(false);
    });
    test('should return false if the x axis is not represented by a number', () => {
      expect(sut.isValidArea({ x: 'a', y: '1' })).toBe(false);
    });
    test('should return false if the y axis is not represented by a number', () => {
      expect(sut.isValidArea({ x: '1', y: 'a' })).toBe(false);
    });
    test('should return true if the area is represented by a number', () => {
      expect(sut.isValidArea({ x: '1', y: '1' })).toBe(true);
    });
  });

  describe('isValidPosition: ', () => {
    test('should return false if the position is entirely wrong', () => {
      expect(sut.isValidPosition({ positionX: 'a', positionY: 'b', direction: 1 })).toBe(false);
    });
    test('should return false if the positionX is wrong', () => {
      expect(sut.isValidPosition({ positionX: 'a', positionY: 2, direction: 'E' })).toBe(false);
    });
    test('should return false if the positionY is wrong', () => {
      expect(sut.isValidPosition({ positionX: 2, positionY: 'a', direction: 'E' })).toBe(false);
    });
    test('should return false if the direction is wrong', () => {
      expect(sut.isValidPosition({ positionX: 1, positionY: 2, direction: 'f' })).toBe(false);
    });
    test('should return true if a position is a string', () => {
      expect(sut.isValidPosition({ positionX: '1', positionY: 2, direction: 'E' })).toBe(true);
    });
    test('should return true if a direction is lowercase', () => {
      expect(sut.isValidPosition({ positionX: 1, positionY: 2, direction: 'e' })).toBe(true);
    });
  });

  describe('outOfBounds: ', () => {
    test('should return true if positionX greater than X axis in area', () => {
      expect(sut.outOfBounds({ x: 1, y: 1 }, { positionX: 2, positionY: 1 })).toBe(true);
    });
    test('should return true if positionY greater than Y axis in area', () => {
      expect(sut.outOfBounds({ x: 1, y: 1 }, { positionX: 1, positionY: 2 })).toBe(true);
    });
    test('should return true if positionX < 0', () => {
      expect(sut.outOfBounds({ x: 10, y: 10 }, { positionX: -1, positionY: 1 })).toBe(true);
    });
    test('should return true if positionY < 0', () => {
      expect(sut.outOfBounds({ x: 10, y: 10 }, { positionX: 2, positionY: -1 })).toBe(true);
    });
    test('should return false if position within the area', () => {
      expect(sut.outOfBounds({ x: 10, y: 10 }, { positionX: 2, positionY: 1 })).toBe(false);
    });
    test('should return false if position in the area limit', () => {
      expect(sut.outOfBounds({ x: 10, y: 10 }, { positionX: 10, positionY: 10 })).toBe(false);
    });
  });
});
