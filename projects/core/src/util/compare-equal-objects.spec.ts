import {
  countOfDeepEqualObjects,
  deepEqualObjects,
  indexOfFirstOccurrence,
  shallowEqualObjects,
} from './compare-equal-objects';

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
      const EXPECTED_COUNT = 2;
      expect(
        countOfDeepEqualObjects({ x: 1, z: { z: 2 } }, [
          { x: 1, z: { z: 2 } },
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(EXPECTED_COUNT);
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
      const EXPECTED_COUNT = 3;
      const EXPECTED_DEEP_OBJ_COUNT = 5;
      const COUNT_DEEP_OBJ_FOUR = 4;
      const COUNT_DEEP_OBJ_THREE = 3;
      const COUNT_DEEP_OBJ_TWO = 2;
      expect(
        countOfDeepEqualObjects(COUNT_DEEP_OBJ_TWO, [
          1,
          COUNT_DEEP_OBJ_TWO,
          COUNT_DEEP_OBJ_THREE,
          COUNT_DEEP_OBJ_FOUR,
          COUNT_DEEP_OBJ_TWO,
          COUNT_DEEP_OBJ_TWO,
          COUNT_DEEP_OBJ_THREE,
        ])
      ).toEqual(EXPECTED_COUNT);
      expect(countOfDeepEqualObjects(EXPECTED_DEEP_OBJ_COUNT, [])).toEqual(0);
    });
  });

  describe('indexOfFirstOccurrence utility', () => {
    it('should return index of first deep equal object', () => {
      const EXPECTED_COUNT = 2;
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
      ).toEqual(EXPECTED_COUNT);
    });

    it('should return index of first deep equal primitive', () => {
      const EXPECTED_COUNT = 2;
      const FIRST_OCC_INDEX = 5;
      const COUNT_DEEP_OBJ_FOUR = 4;
      const COUNT_DEEP_OBJ_THREE = 3;
      const EXPECTED_FIRST_OCC = 3;
      const COUNT_DEEP_OBJ_TWO = 2;
      expect(
        indexOfFirstOccurrence(EXPECTED_FIRST_OCC, [
          1,
          COUNT_DEEP_OBJ_TWO,
          COUNT_DEEP_OBJ_THREE,
          COUNT_DEEP_OBJ_FOUR,
          COUNT_DEEP_OBJ_TWO,
          COUNT_DEEP_OBJ_THREE,
          COUNT_DEEP_OBJ_THREE,
        ])
      ).toEqual(EXPECTED_COUNT);
      expect(indexOfFirstOccurrence(FIRST_OCC_INDEX, [])).toEqual(undefined);
    });
  });
});
