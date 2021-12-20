import {
  EqualObjectComparer
} from './equal-object-comparer';

describe('EqualObjectComparer', () => {
  describe('shallowEqualObjects utility', () => {
    it('should return true for the same references', () => {
      const a = { x: 1, y: 2 };
      expect(EqualObjectComparer.shallowEqualObjects(a, a)).toEqual(true);
    });

    it('should return false if one of arguments is null', () => {
      expect(EqualObjectComparer.shallowEqualObjects({}, null)).toEqual(false);
    });

    it('should return false if one of arguments is undefined', () => {
      expect(EqualObjectComparer.shallowEqualObjects({}, undefined)).toEqual(false);
    });

    it('should return false if objects have different keys', () => {
      expect(EqualObjectComparer.shallowEqualObjects({ x: 1 }, { y: 2 })).toEqual(false);
    });

    it('should return false if one object has more keys than other', () => {
      expect(EqualObjectComparer.shallowEqualObjects({ x: 1 }, { x: 1, y: 2 })).toEqual(false);
    });

    it('should return false if objects have different values of the same keys', () => {
      expect(EqualObjectComparer.shallowEqualObjects({ x: 1, y: 2 }, { x: 1, y: 22222 })).toEqual(
        false
      );
    });

    it('should return true if objects have the same values of the same keys', () => {
      const sharedObject = {};
      expect(
        EqualObjectComparer.shallowEqualObjects(
          { x: 1, y: sharedObject },
          { x: 1, y: sharedObject }
        )
      ).toEqual(true);
    });

    it('should return false if objects have different objects at the same keys', () => {
      expect(EqualObjectComparer.shallowEqualObjects({ x: {} }, { x: {} })).toEqual(false);
    });
  });

  describe('deepEqualObjects utility', () => {
    it('should return true for the same references', () => {
      const a = { x: 1, y: 2 };
      expect(EqualObjectComparer.deepEqualObjects(a, a)).toEqual(true);
    });

    it('should return false if one of arguments is null', () => {
      expect(EqualObjectComparer.deepEqualObjects({}, null)).toEqual(false);
    });

    it('should return false if one of arguments is undefined', () => {
      expect(EqualObjectComparer.deepEqualObjects({}, undefined)).toEqual(false);
    });

    it('should return false if objects have different keys', () => {
      expect(EqualObjectComparer.deepEqualObjects({ x: 1 }, { y: 2 })).toEqual(false);
    });

    it('should return false if one object has more keys than other', () => {
      expect(EqualObjectComparer.deepEqualObjects({ x: 1 }, { x: 1, y: 2 })).toEqual(false);
    });

    it('should return false if objects have different values of the same keys', () => {
      expect(EqualObjectComparer.deepEqualObjects({ x: 1, y: 2 }, { x: 1, y: 22222 })).toEqual(
        false
      );
    });

    it('should return true if objects have the same values of the same keys', () => {
      const sharedObject = {};
      expect(
        EqualObjectComparer.deepEqualObjects({ x: 1, y: sharedObject }, { x: 1, y: sharedObject })
      ).toEqual(true);
    });

    it('should return true if objects have the same nested properties', () => {
      expect(
        EqualObjectComparer.deepEqualObjects({ x: 1, y: { z: 3 } }, { x: 1, y: { z: 3 } })
      ).toEqual(true);
    });

    it('should return false if objects have different nested properties', () => {
      expect(
        EqualObjectComparer.deepEqualObjects({ x: 1, y: { z: 3 } }, { x: 1, y: { z: 4 } })
      ).toEqual(false);
    });

    it('should return false if objects have more nested properties', () => {
      expect(
        EqualObjectComparer.deepEqualObjects({ x: 1, y: { z: 3 } }, { x: 1, y: { z: 3, h: 2 } })
      ).toEqual(false);
    });
  });

  describe('countOfDeepEqualObjects utility', () => {
    it('should return count of deep equal objects', () => {
      expect(
        EqualObjectComparer.countOfDeepEqualObjects({ x: 1, z: { z: 2 } }, [
          { x: 1, z: { z: 2 } },
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(2);
      expect(
        EqualObjectComparer.countOfDeepEqualObjects({ x: 1 }, [
          { x: 1 },
          { y: 2 },
          { z: 1 },
          { x: 2 },
        ])
      ).toEqual(1);
    });

    it('should return count of equal primitives', () => {
      expect(EqualObjectComparer.countOfDeepEqualObjects(2, [1, 2, 3, 4, 2, 3, 3])).toEqual(2);
      expect(EqualObjectComparer.countOfDeepEqualObjects(5, [])).toEqual(0);
    });
  });

  describe('indexOfFirstOccurrence utility', () => {
    it('should return index of first deep equal object', () => {
      expect(
        EqualObjectComparer.indexOfFirstOccurrence({ x: 1, z: { z: 2 } }, [
          { x: 2, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
          { x: 1, z: { z: 2 } },
        ])
      ).toEqual(1);
      expect(
        EqualObjectComparer.indexOfFirstOccurrence({ x: 1 }, [
          { y: 2 },
          { z: 1 },
          { x: 1 },
          { x: 2 },
        ])
      ).toEqual(2);
    });

    it('should return index of first deep equal primitive', () => {
      expect(EqualObjectComparer.indexOfFirstOccurrence(3, [1, 2, 3, 4, 2, 3, 3])).toEqual(2);
      expect(EqualObjectComparer.indexOfFirstOccurrence(5, [])).toEqual(undefined);
    });
  });
});
