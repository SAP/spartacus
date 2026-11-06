import { ObjectComparisonUtils } from './object-comparison-utils';

describe('ObjectComparisonUtils', () => {
  describe('shallowEqualObjects utility', () => {
    it('should return true for the same references', () => {
      const a = { x: 1, y: 2 };
      expect(ObjectComparisonUtils.shallowEqualObjects(a, a)).toEqual(true);
    });

    it('should return false if one of arguments is null', () => {
      expect(ObjectComparisonUtils.shallowEqualObjects({}, null)).toEqual(
        false
      );
    });

    it('should return false if one of arguments is undefined', () => {
      expect(ObjectComparisonUtils.shallowEqualObjects({}, undefined)).toEqual(
        false
      );
    });

    it('should return false if objects have different keys', () => {
      expect(
        ObjectComparisonUtils.shallowEqualObjects({ x: 1 }, { y: 2 })
      ).toEqual(false);
    });

    it('should return false if one object has more keys than other', () => {
      expect(
        ObjectComparisonUtils.shallowEqualObjects({ x: 1 }, { x: 1, y: 2 })
      ).toEqual(false);
    });

    it('should return false if objects have different values of the same keys', () => {
      expect(
        ObjectComparisonUtils.shallowEqualObjects(
          { x: 1, y: 2 },
          { x: 1, y: 22222 }
        )
      ).toEqual(false);
    });

    it('should return true if objects have the same values of the same keys', () => {
      const sharedObject = {};
      expect(
        ObjectComparisonUtils.shallowEqualObjects(
          { x: 1, y: sharedObject },
          { x: 1, y: sharedObject }
        )
      ).toEqual(true);
    });

    it('should return false if objects have different objects at the same keys', () => {
      expect(
        ObjectComparisonUtils.shallowEqualObjects({ x: {} }, { x: {} })
      ).toEqual(false);
    });
  });

  describe('deepEqualObjects utility', () => {
    it('should return true for the same references', () => {
      const a = { x: 1, y: 2 };
      expect(ObjectComparisonUtils.deepEqualObjects(a, a)).toEqual(true);
    });

    it('should return false if one of arguments is null', () => {
      expect(ObjectComparisonUtils.deepEqualObjects({}, null)).toEqual(false);
    });

    it('should return false if one of arguments is undefined', () => {
      expect(ObjectComparisonUtils.deepEqualObjects({}, undefined)).toEqual(
        false
      );
    });

    it('should return false if objects have different keys', () => {
      expect(
        ObjectComparisonUtils.deepEqualObjects({ x: 1 }, { y: 2 })
      ).toEqual(false);
    });

    it('should return false if one object has more keys than other', () => {
      expect(
        ObjectComparisonUtils.deepEqualObjects({ x: 1 }, { x: 1, y: 2 })
      ).toEqual(false);
    });

    it('should return false if objects have different values of the same keys', () => {
      expect(
        ObjectComparisonUtils.deepEqualObjects(
          { x: 1, y: 2 },
          { x: 1, y: 22222 }
        )
      ).toEqual(false);
    });

    it('should return true if objects have the same values of the same keys', () => {
      const sharedObject = {};
      expect(
        ObjectComparisonUtils.deepEqualObjects(
          { x: 1, y: sharedObject },
          { x: 1, y: sharedObject }
        )
      ).toEqual(true);
    });

    it('should return true if objects have the same nested properties', () => {
      expect(
        ObjectComparisonUtils.deepEqualObjects(
          { x: 1, y: { z: 3 } },
          { x: 1, y: { z: 3 } }
        )
      ).toEqual(true);
    });

    it('should return false if objects have different nested properties', () => {
      expect(
        ObjectComparisonUtils.deepEqualObjects(
          { x: 1, y: { z: 3 } },
          { x: 1, y: { z: 4 } }
        )
      ).toEqual(false);
    });

    it('should return false if objects have more nested properties', () => {
      expect(
        ObjectComparisonUtils.deepEqualObjects(
          { x: 1, y: { z: 3 } },
          { x: 1, y: { z: 3, h: 2 } }
        )
      ).toEqual(false);
    });
  });

  describe('countOfDeepEqualObjects utility', () => {
    it('should return count of deep equal objects', () => {
      expect(
        ObjectComparisonUtils.countOfDeepEqualObjects({ x: 1, z: { z: 2 } }, [
          { x: 1, z: { z: 2 } },
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(2);
      expect(
        ObjectComparisonUtils.countOfDeepEqualObjects({ x: 1 }, [
          { x: 1 },
          { y: 2 },
          { z: 1 },
          { x: 2 },
        ])
      ).toEqual(1);
    });

    it('should return count of equal primitives', () => {
      expect(
        ObjectComparisonUtils.countOfDeepEqualObjects(2, [1, 2, 3, 4, 2, 3, 3])
      ).toEqual(2);
      expect(ObjectComparisonUtils.countOfDeepEqualObjects(5, [])).toEqual(0);
    });
  });

  describe('indexOfFirstOccurrence utility', () => {
    it('should return index of first deep equal object', () => {
      expect(
        ObjectComparisonUtils.indexOfFirstOccurrence({ x: 1, z: { z: 2 } }, [
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(1);
      expect(
        ObjectComparisonUtils.indexOfFirstOccurrence({ x: 1 }, [
          { y: 2 },
          { z: 1 },
          { x: 1 },
          { x: 2 },
        ])
      ).toEqual(2);
    });

    it('should return index of first deep equal primitive', () => {
      expect(
        ObjectComparisonUtils.indexOfFirstOccurrence(3, [1, 2, 3, 4, 2, 3, 3])
      ).toEqual(2);
      expect(ObjectComparisonUtils.indexOfFirstOccurrence(5, [])).toEqual(
        undefined
      );
    });
  });
});
