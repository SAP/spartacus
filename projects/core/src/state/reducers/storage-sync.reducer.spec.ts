import { createShellObject, resolveObjectValue } from './storage-sync.reducer';

describe('storage sync reducer', () => {
  // let winRef: WindowRef;
  // beforeEach(() => {
  //   winRef = {
  //     get localStorage(): Storage {
  //       return {} as Storage;
  //     },
  //     get sessionStorage(): Storage {
  //       return {} as Storage;
  //     },
  //   } as WindowRef;
  // });

  // fdescribe('resolveStorageObject', () => {
  //   const config: StateConfig = {
  //     state: {
  //       storageSync: {
  //         keys2: {
  //           'a.b.c': StorageSyncType.LOCAL_STORAGE,
  //           'd.e': StorageSyncType.LOCAL_STORAGE,
  //           f: StorageSyncType.LOCAL_STORAGE,
  //         },
  //       },
  //     },
  //   };

  //   describe('', () => {});
  // });

  describe('createShellObject', () => {
    describe('when an empty key is passed', () => {
      it('should return an empty shell object', () => {
        const result = createShellObject('', {});
        expect(result).toEqual({});
      });
    });
    describe('when a falsy value is passed', () => {
      it('should return an empty shell object', () => {
        const result = createShellObject('a', {});
        expect(result).toEqual({});
      });
    });

    describe('when a one-level key is provided', () => {
      it('should return a shell object with only one property', () => {
        const value = { someValue: 'value' };
        const result = createShellObject('a', value);
        expect(result).toEqual({ a: value });
      });
    });
    describe('when multi-level object is provided', () => {
      it('should create a multi level shell object', () => {
        const value = { someValue: 'value' };
        const result = createShellObject('a.b.c', value);
        expect(result).toEqual({ a: { b: { c: value } } });
      });
    });
  });

  describe('resolveObjectValue', () => {
    it('should return null if no key is provided', () => {
      const result = resolveObjectValue(null, {});
      expect(result).toBeFalsy();
    });

    it('should return null when the key does NOT exist', () => {
      const result = resolveObjectValue('a', {});
      expect(result).toBeFalsy();
    });

    it('should return a first-level value when a non-nested key is provided', () => {
      const object: Object = {
        a: 'value',
      };
      const result = resolveObjectValue('a', object);
      expect(result).toEqual('value');
    });

    it('should return a nth-level value when a nested key is provided', () => {
      const object: Object = {
        a: {
          b: {
            c: 'value',
          },
        },
      };
      const result = resolveObjectValue('a.b.c', object);
      expect(result).toEqual('value');
    });

    it('should return a null when a NON existing nested key is provided', () => {
      const object: Object = {
        a: {
          b: 'value',
        },
      };
      const result = resolveObjectValue('a.b.c', object);
      expect(result).toBeFalsy();
    });
  });
});
