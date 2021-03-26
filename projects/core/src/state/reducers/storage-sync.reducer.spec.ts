import { Action, ActionReducer, MetaReducer, UPDATE } from '@ngrx/store';
import { WindowRef } from '../../window/window-ref';
import {
  DEFAULT_LOCAL_STORAGE_KEY,
  DEFAULT_SESSION_STORAGE_KEY,
} from '../config/default-state-config';
import { StateConfig, StorageSyncType } from '../config/state-config';
import { filterKeysByType } from '../utils/get-state-slice';
import {
  exists,
  getStorage,
  getStorageSyncReducer,
  isSsr,
  persistToStorage,
  readFromStorage,
  rehydrate,
  removeFromStorage,
} from './storage-sync.reducer';

const sessionStorageMock = {
  getItem(_key: string): string | null {
    return '"value"';
  },
  setItem(_key: string, _value: string): void {},
  removeItem(_key: string): void {},
} as Storage;

const localStorageMock = {
  getItem(_key: string): string | null {
    return '"value"';
  },
  setItem(_key: string, _value: string): void {},
  removeItem(_key: string): void {},
} as Storage;

const winRef = {
  get nativeWindow(): Window {
    return {} as Window;
  },
  get sessionStorage(): Storage {
    return sessionStorageMock;
  },
  get localStorage(): Storage {
    return localStorageMock;
  },
} as WindowRef;

describe('storage-sync-reducer', () => {
  describe('getStorageSyncReducer', () => {
    let nextReducer: ActionReducer<Object, Action>;
    let metaReducer: MetaReducer<Object, Action>;
    let reducer: ActionReducer<Object, Action>;

    beforeEach(() => {
      nextReducer = function <T>(state: T, _action: Action) {
        return state;
      };
      metaReducer = getStorageSyncReducer(winRef, {
        state: {
          storageSync: {
            localStorageKeyName: DEFAULT_LOCAL_STORAGE_KEY,
            sessionStorageKeyName: DEFAULT_SESSION_STORAGE_KEY,
            keys: {
              access_token: StorageSyncType.SESSION_STORAGE,
              refresh_token: StorageSyncType.LOCAL_STORAGE,
              do_not_sync: StorageSyncType.NO_STORAGE,
              user: StorageSyncType.SESSION_STORAGE,
            },
            excludeKeys: {
              'user.account.details.currency.name':
                StorageSyncType.SESSION_STORAGE,
              'user.account.details.currency.symbol':
                StorageSyncType.SESSION_STORAGE,
            },
          },
        },
      } as StateConfig);
      reducer = metaReducer(nextReducer);
    });

    it('should return transparent reducer without proper configuration', () => {
      const syncReducer = getStorageSyncReducer(winRef, undefined);
      const subReducer: any = () => {};
      expect(syncReducer(subReducer)).toBe(subReducer);
    });

    describe('when the action type is UPDATE and the rehydrate config is set to true', () => {
      it('should rehydrate the state', () => {
        spyOn(sessionStorageMock, 'getItem').and.returnValue(
          JSON.stringify({ access_token: 'xxx' })
        );
        spyOn(localStorageMock, 'getItem').and.returnValue(
          JSON.stringify({ refresh_token: 'yyy' })
        );
        const result = reducer({}, { type: UPDATE });
        expect(result).toEqual({
          access_token: 'xxx',
          refresh_token: 'yyy',
        });
      });
    });

    describe('when the action type is NOT UPDATE nor INIT', () => {
      describe('should set the configured keys to the configured storage', () => {
        beforeEach(() => {
          spyOn(sessionStorageMock, 'setItem').and.stub();
          spyOn(localStorageMock, 'setItem').and.stub();
        });

        it('for existing state', () => {
          const state = {
            access_token: 'xxx',
            refresh_token: 'yyy',
          };

          const result = reducer(state, { type: 'AN-ACTION' });
          expect(result).toEqual(state);
          expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
            DEFAULT_SESSION_STORAGE_KEY,
            JSON.stringify({
              access_token: 'xxx',
            })
          );
          expect(localStorageMock.setItem).toHaveBeenCalledWith(
            DEFAULT_LOCAL_STORAGE_KEY,
            JSON.stringify({
              refresh_token: 'yyy',
            })
          );
        });
        it('for new state', () => {
          const testReducer = metaReducer(
            (_state, action: any) => action.payload
          ) as any;

          const newState = {
            access_token: 'xxx',
            refresh_token: 'yyy',
          };

          const result = testReducer(
            {},
            { type: 'AN-ACTION', payload: newState }
          );
          expect(result).toEqual(newState);
          expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
            DEFAULT_SESSION_STORAGE_KEY,
            JSON.stringify({
              access_token: 'xxx',
            })
          );
          expect(localStorageMock.setItem).toHaveBeenCalledWith(
            DEFAULT_LOCAL_STORAGE_KEY,
            JSON.stringify({
              refresh_token: 'yyy',
            })
          );
        });
      });

      it('should set the configured keys to the configured storage and exclude specified keys', () => {
        const state = {
          user: {
            account: {
              addresses: {
                loading: false,
              },
              details: {
                currency: {
                  name: 'CAD',
                  symbol: '$',
                  value: 100,
                },
              },
            },
          },
        };
        spyOn(sessionStorageMock, 'getItem').and.returnValue(
          JSON.stringify(state)
        );
        spyOn(sessionStorageMock, 'setItem').and.stub();

        const result = reducer(state, { type: 'AN-ACTION' });
        // excluded keys are not stored in the storage, but they're present in the state
        expect(result).toEqual(state);
        expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
          DEFAULT_SESSION_STORAGE_KEY,
          JSON.stringify({
            user: {
              account: {
                addresses: {
                  loading: false,
                },
                details: {
                  currency: {
                    value: 100,
                  },
                },
              },
            },
          })
        );
      });
    });
  });

  describe('rehydrate', () => {
    it('should return a rehydrated state', () => {
      const accessTokenMock = {
        user: {
          token: {
            access_token: 'xxx',
          },
        },
      };
      const refreshTokenMock = {
        user: {
          token: {
            refresh_token: 'yyy',
          },
        },
      };
      spyOn(localStorageMock, 'getItem').and.returnValue(
        JSON.stringify(accessTokenMock)
      );
      spyOn(sessionStorageMock, 'getItem').and.returnValue(
        JSON.stringify(refreshTokenMock)
      );

      const config = {
        state: {
          storageSync: {
            rehydrate: true,
            keys: {
              'user.token.access_token': StorageSyncType.SESSION_STORAGE,
              'user.token.refresh_token': StorageSyncType.LOCAL_STORAGE,
            },
          },
        },
      } as StateConfig;

      const result = rehydrate(config, winRef);
      expect(result).toEqual({
        user: {
          token: {
            access_token: 'xxx',
            refresh_token: 'yyy',
          },
        },
      });
    });
  });

  describe('exists', () => {
    describe('when undefined is provided', () => {
      it('should return false', () => {
        expect(exists(undefined)).toEqual(false);
      });
    });
    describe('when an empty object is provided', () => {
      it('should return false', () => {
        expect(exists({})).toEqual(false);
      });
    });
    describe('when an empty string is provided', () => {
      it('should return false', () => {
        expect(exists('')).toEqual(false);
      });
    });

    describe('when a non-zero number is provided', () => {
      it('should return true', () => {
        expect(exists(7)).toEqual(true);
      });
    });
    describe('when zero (0) is provided', () => {
      it('should return true', () => {
        expect(exists(0)).toEqual(true);
      });
    });
    describe('when boolean false is provided', () => {
      it('should return true', () => {
        expect(exists(false)).toEqual(true);
      });
    });
    describe('when boolean true is provided', () => {
      it('should return true', () => {
        expect(exists(true)).toEqual(true);
      });
    });
    describe('when a complex object is provided', () => {
      it('should return true', () => {
        expect(exists({ a: { b: {} } })).toEqual(true);
      });
    });
    describe('when null is provided instead of keys', () => {
      it('should return an empty array', () => {
        const result = filterKeysByType(null, StorageSyncType.NO_STORAGE);
        expect(result).toEqual([]);
      });
    });
  });

  describe('getStorage', () => {
    describe('when no storage type is requested', () => {
      it(`should return winRef's default storage`, () => {
        const spy = spyOnProperty(winRef, 'sessionStorage', 'get').and.stub();
        getStorage(undefined, winRef);
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('when localStorage type is requested', () => {
      it(`should return winRef's local storage`, () => {
        const spy = spyOnProperty(winRef, 'localStorage', 'get').and.stub();
        getStorage(StorageSyncType.LOCAL_STORAGE, winRef);
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('when sessionStorage type is requested', () => {
      it(`should return winRef's default storage`, () => {
        const spy = spyOnProperty(winRef, 'sessionStorage', 'get').and.stub();
        getStorage(StorageSyncType.SESSION_STORAGE, winRef);
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('when no storage type is requested', () => {
      it(`should return undefined`, () => {
        const result = getStorage(StorageSyncType.NO_STORAGE, winRef);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('persistToStorage', () => {
    describe('when the provided value does NOT exist', () => {
      it('should NOT persist it', () => {
        spyOn(sessionStorageMock, 'setItem').and.stub();

        persistToStorage('a', undefined, sessionStorageMock);
        expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
      });
    });
    describe('when the provided value exists', () => {
      it('should persist it', () => {
        spyOn(JSON, 'stringify').and.callThrough();
        spyOn(sessionStorageMock, 'setItem').and.stub();

        persistToStorage('a', 'xxx', sessionStorageMock);
        expect(JSON.stringify).toHaveBeenCalledWith('xxx');
        expect(sessionStorageMock.setItem).toHaveBeenCalledWith('a', '"xxx"');
      });
    });
  });

  describe('readFromStorage', () => {
    describe('when no storage is provided', () => {
      it('should return undefined', () => {
        const result = readFromStorage(null, 'a');
        expect(result).toBeUndefined();
      });
    });

    describe('when there is no value under the provided key', () => {
      it('should return undefined', () => {
        spyOn(sessionStorageMock, 'getItem').and.returnValue(undefined);
        const result = readFromStorage(sessionStorageMock, 'a');
        expect(result).toBeUndefined();
      });
    });

    describe('when there is no value under the provided key', () => {
      it('should return undefined', () => {
        spyOn(JSON, 'parse').and.callThrough();
        spyOn(sessionStorageMock, 'getItem').and.returnValue('"a"');

        const result = readFromStorage(sessionStorageMock, 'a');
        expect(JSON.parse).toHaveBeenCalledWith('"a"');
        expect(result).toEqual('a');
      });
    });
  });

  describe('isSsr', () => {
    it('should return true if the provided storage does NOT exist', () => {
      expect(isSsr(undefined)).toEqual(true);
    });
    it('should return false if the provided storage exists', () => {
      expect(isSsr(localStorageMock)).toEqual(false);
    });
  });

  describe('removeFromStorage', () => {
    it('should not call removeItem if the provided storage does NOT exist', () => {
      spyOn(sessionStorageMock, 'removeItem').and.stub();
      removeFromStorage('key', undefined as any);
      expect(sessionStorageMock.removeItem).not.toHaveBeenCalled();
    });
    it('should call removeItem for the provided storage', () => {
      spyOn(sessionStorageMock, 'removeItem').and.stub();
      removeFromStorage('key', sessionStorageMock);
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('key');
    });
  });
});
