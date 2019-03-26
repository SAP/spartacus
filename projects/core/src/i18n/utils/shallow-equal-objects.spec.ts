import { shallowEqualObjects } from './shallow-equal-objects';

describe('shallowEqualObjects utility', () => {
  it('should return true for the same references', () => {
    const a = { x: 1, y: 2 };
    expect(shallowEqualObjects(a, a)).toEqual(true);
  });

  it('should return false if one of arguments is null', () => {
    expect(shallowEqualObjects({}, null)).toEqual(false);
  });

  it('should return false if one of arguments is undefined', () => {
    expect(shallowEqualObjects({}, undefined)).toEqual(false);
  });

  it('should return false if objects have different keys', () => {
    expect(shallowEqualObjects({ x: 1 }, { y: 2 })).toEqual(false);
  });

  it('should return false if one object has more keys than other', () => {
    expect(shallowEqualObjects({ x: 1 }, { x: 1, y: 2 })).toEqual(false);
  });

  it('should return false if objects have different values of the same keys', () => {
    expect(shallowEqualObjects({ x: 1, y: 2 }, { x: 1, y: 22222 })).toEqual(
      false
    );
  });

  it('should return false if objects have different objects at the same keys', () => {
    expect(shallowEqualObjects({ x: {} }, { x: {} })).toEqual(false);
  });

  it('should return true if objects have the same values of the same keys', () => {
    const sharedObject = {};
    expect(
      shallowEqualObjects({ x: 1, y: sharedObject }, { x: 1, y: sharedObject })
    ).toEqual(true);
  });
});
