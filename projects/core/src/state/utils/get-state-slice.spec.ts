import {
  createShellObject,
  getStateSlice,
  getStateSliceValue,
} from './get-state-slice';

describe('state slice functions', () => {
  describe('getStateSliceValue', () => {
    it('should return an undefined value when a the provided key does not exist', () => {
      const state = {
        a: 'value',
      };
      expect(getStateSliceValue('b', state)).toBeUndefined();
    });
    it('should return a value when a one-level key is provided', () => {
      const state = {
        a: 'value',
      };
      expect(getStateSliceValue('a', state)).toEqual('value');
    });
    it('should return a value when a two-level key is provided', () => {
      const state = {
        a: {
          b: 'value',
        },
      };
      expect(getStateSliceValue('a.b', state)).toEqual('value');
    });
    it('should return a value when a multi-level key is provided', () => {
      const state = {
        a: {
          b: {
            v: {
              g: 'value',
            },
          },
        },
      };
      expect(getStateSliceValue('a.b.v.g', state)).toEqual('value');
    });
  });

  describe('createShellObject', () => {
    describe('when no key is provided', () => {
      it('should return an empty object', () => {
        expect(createShellObject('', { test: 'test' })).toEqual({});
      });
    });
    describe('when no value is provided', () => {
      it('should return an empty object', () => {
        expect(createShellObject('key', undefined)).toEqual({});
      });
    });
    describe('when an empty object is provided as a value', () => {
      it('should return an empty object', () => {
        expect(createShellObject('', {})).toEqual({});
      });
    });

    describe('when a one-level key is provided', () => {
      it('should create an object with one property', () => {
        const key = 'test';
        const value = 'value';

        const result = createShellObject(key, value);
        expect(result).toEqual({
          test: value,
        });
      });
    });
    describe('when a two-level key is provided', () => {
      it('should create an object with nested properties', () => {
        const key = 'a.b';
        const value = 'value';

        const result = createShellObject(key, value);
        expect(result).toEqual({
          a: {
            b: value,
          },
        });
      });
    });
    describe('when a multi-level key is provided', () => {
      it('should create an object with nested properties', () => {
        const key = 'a.b.v.g';
        const value = 'value';

        const result = createShellObject(key, value);
        expect(result).toEqual({
          a: {
            b: {
              v: {
                g: value,
              },
            },
          },
        });
      });
    });
  });

  describe('getStateSlice', () => {
    it('should get a state slice from a top branch', () => {
      const state = {
        products: { 1: 'als', 2: 'veta' },
        cms: { pages: { page1: 'saddsa', page2: 'page2' } },
        auth: 'authconfig',
      };

      const keys = ['products'];
      const result = getStateSlice(keys, state);

      const expected = { products: state.products };
      expect(result).toEqual(expected);
    });

    it('should get a state slice from a branche 2 levels deep', () => {
      const state = {
        products: { 1: 'als', 2: 'veta' },
        cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
        auth: 'authconfig',
      };

      const keys = ['cms.pages'];
      const result = getStateSlice(keys, state);

      const expected = {
        cms: { pages: state.cms.pages },
      };
      expect(result).toEqual(expected);
    });

    it('should get a state slice from a branch 3 levels deep', () => {
      const state = {
        products: { 1: 'als', 2: 'veta' },
        cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
        auth: 'authconfig',
      };

      const keys = ['cms.pages.page1'];
      const result = getStateSlice(keys, state);

      const expected = { cms: { pages: { page1: state.cms.pages.page1 } } };
      expect(result).toEqual(expected);
    });

    it('should not get the state if a key is not present', () => {
      const state = {
        products: { 1: 'als', 2: 'veta' },
        cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
        auth: 'authconfig',
      };

      const keys = ['notPresent'];
      const result = getStateSlice(keys, state);

      expect(result).toEqual({});
    });

    it('should return one object with all the specified values', () => {
      const state = {
        user: {
          auth: {
            userToken: {
              access_token: 'xxx',
              refresh_token: 'yyy',
            },
          },
        },
        products: {
          product1: 'p1',
          product2: 'p2',
        },
        cms: {
          a: {
            b: {
              c: 'd',
            },
          },
        },
      };

      const keys = [
        'user.auth.userToken.access_token',
        'products.product1',
        'cms',
      ];
      const result = getStateSlice(keys, state);
      expect(result).toEqual({
        user: {
          auth: {
            userToken: {
              access_token: 'xxx',
            },
          },
        },
        products: {
          product1: 'p1',
        },
        cms: {
          a: {
            b: {
              c: 'd',
            },
          },
        },
      });
    });

    it('should return one object with all the specified values and skip unknown properties', () => {
      const state = {
        user: {
          auth: {
            userToken: {
              access_token: 'xxx',
              refresh_token: 'yyy',
            },
          },
        },
        products: {
          product1: 'p1',
          product2: 'p2',
        },
        cms: {
          a: {
            b: {
              c: 'd',
            },
          },
        },
      };

      const keys = [
        'user.auth.userToken.access_token',
        'products.product1',
        'xxx',
      ];
      const result = getStateSlice(keys, state);
      expect(result).toEqual({
        user: {
          auth: {
            userToken: {
              access_token: 'xxx',
            },
          },
        },
        products: {
          product1: 'p1',
        },
      });
    });
  });
});
