import {
  countOfDeepEqualObjects,
  deepEqualObjects,
  indexOfFirstOccurrence,
  shallowEqualObjects,
} from './compare-equal-objects';

const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

describe('compare equal objects utilities', () => {
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

    it('should return true if objects have the same values of the same keys', () => {
      const sharedObject = {};
      expect(
        shallowEqualObjects(
          { x: 1, y: sharedObject },
          { x: 1, y: sharedObject }
        )
      ).toEqual(true);
    });

    it('should return false if objects have different objects at the same keys', () => {
      expect(shallowEqualObjects({ x: {} }, { x: {} })).toEqual(false);
    });
  });

  describe('deepEqualObjects utility', () => {
    it('should return true for the same references', () => {
      const a = { x: 1, y: 2 };
      expect(deepEqualObjects(a, a)).toEqual(true);
    });

    it('should return false if one of arguments is null', () => {
      expect(deepEqualObjects({}, null)).toEqual(false);
    });

    it('should return false if one of arguments is undefined', () => {
      expect(deepEqualObjects({}, undefined)).toEqual(false);
    });

    it('should return false if objects have different keys', () => {
      expect(deepEqualObjects({ x: 1 }, { y: 2 })).toEqual(false);
    });

    it('should return false if one object has more keys than other', () => {
      expect(deepEqualObjects({ x: 1 }, { x: 1, y: 2 })).toEqual(false);
    });

    it('should return false if objects have different values of the same keys', () => {
      expect(deepEqualObjects({ x: 1, y: 2 }, { x: 1, y: 22222 })).toEqual(
        false
      );
    });

    it('should return true if objects have the same values of the same keys', () => {
      const sharedObject = {};
      expect(
        deepEqualObjects({ x: 1, y: sharedObject }, { x: 1, y: sharedObject })
      ).toEqual(true);
    });

    it('should return true if objects have the same nested properties', () => {
      expect(
        deepEqualObjects({ x: 1, y: { z: 3 } }, { x: 1, y: { z: 3 } })
      ).toEqual(true);
    });

    it('should return false if objects have different nested properties', () => {
      expect(
        deepEqualObjects({ x: 1, y: { z: 3 } }, { x: 1, y: { z: 4 } })
      ).toEqual(false);
    });

    it('should return false if objects have more nested properties', () => {
      expect(
        deepEqualObjects({ x: 1, y: { z: 3 } }, { x: 1, y: { z: 3, h: 2 } })
      ).toEqual(false);
    });
  });

  describe('countOfDeepEqualObjects utility', () => {
    it('should return count of deep equal objects', () => {
      expect(
        countOfDeepEqualObjects({ x: 1, z: { z: 2 } }, [
          { x: 1, z: { z: 2 } },
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(TWO);
      expect(
        countOfDeepEqualObjects({ x: 1 }, [
          { x: 1 },
          { y: 2 },
          { z: 1 },
          { x: 2 },
        ])
      ).toEqual(1);
    });

    it('should return count of equal primitives', () => {
      expect(
        countOfDeepEqualObjects(TWO, [1, TWO, THREE, FOUR, TWO, TWO, THREE])
      ).toEqual(TWO);
      expect(countOfDeepEqualObjects(FIVE, [])).toEqual(0);
    });
  });

  describe('indexOfFirstOccurrence utility', () => {
    it('should return index of first deep equal object', () => {
      expect(
        indexOfFirstOccurrence({ x: 1, z: { z: 2 } }, [
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(1);
      expect(
        indexOfFirstOccurrence({ x: 1 }, [
          { y: 2 },
          { z: 1 },
          { x: 1 },
          { x: 2 },
        ])
      ).toEqual(TWO);
    });

    it('should return index of first deep equal primitive', () => {
      expect(
        indexOfFirstOccurrence(THREE, [1, TWO, THREE, FOUR, TWO, THREE, THREE])
      ).toEqual(TWO);
      expect(indexOfFirstOccurrence(FIVE, [])).toEqual(undefined);
    });
  });
});
