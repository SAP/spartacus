import { Action, ActionReducer, MetaReducer, UPDATE } from '@ngrx/store';
import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';
import {
  exists,
  getStorage,
  getStorageSyncReducer,
  isSsr,
  persistToStorage,
  readFromStorage,
  rehydrate,
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
      nextReducer = function<T>(state: T, _action: Action) {
        return state;
      };
      metaReducer = getStorageSyncReducer(winRef, {
        state: {
          storageSync: {
            rehydrate: true,
            keys: {
              access_token: StorageSyncType.SESSION_STORAGE,
              refresh_token: StorageSyncType.LOCAL_STORAGE,
              do_not_sync: StorageSyncType.NO_STORAGE,
            },
          },
        },
      });
      reducer = metaReducer(nextReducer);
    });

    it('should return undefined without proper configuration', () => {
      const result = getStorageSyncReducer(winRef, undefined);
      expect(result).toBe(undefined);
    });

    describe('when the action type is UPDATE and the rehydrate config is set to true', () => {
      it('should rehydrate the state', () => {
        const rehydratedState = {
          access_token: 'xxx',
          refresh_token: 'yyy',
        };
        spyOn(sessionStorageMock, 'getItem').and.returnValue('"xxx"');
        spyOn(localStorageMock, 'getItem').and.returnValue('"yyy"');
        const result = reducer({}, { type: UPDATE });
        expect(result).toEqual(rehydratedState);
      });
    });

    describe('when a key is set to NO_STORAGE', () => {
      it('should NOT sync it to storage', () => {
        spyOn(sessionStorageMock, 'getItem').and.stub();
        spyOn(localStorageMock, 'getItem').and.stub();
        spyOn(sessionStorageMock, 'setItem').and.stub();
        spyOn(localStorageMock, 'setItem').and.stub();

        const state = { do_not_sync: 'do NOT sync' };
        const result = reducer(state, { type: 'AN-ACTION' });
        expect(result).toEqual(state);
        expect(sessionStorageMock.getItem).not.toHaveBeenCalled();
        expect(localStorageMock.getItem).not.toHaveBeenCalled();
        expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
      });
    });

    describe('when the action type is NOT UPDATE nor INIT', () => {
      it('should set the configured keys to configured storage', () => {
        spyOn(sessionStorageMock, 'getItem').and.returnValue('"xxx"');
        spyOn(localStorageMock, 'getItem').and.returnValue('"yyy"');

        spyOn(sessionStorageMock, 'setItem').and.stub();
        spyOn(localStorageMock, 'setItem').and.stub();

        const state = {
          access_token: 'xxx',
          refresh_token: 'yyy',
        };

        const result = reducer(state, { type: 'AN-ACTION' });
        expect(result).toEqual(state);
        expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
          'access_token',
          '"xxx"'
        );
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'refresh_token',
          '"yyy"'
        );
      });
    });

    describe('when a slice of the state is cleared', () => {
      it('should remove the value from the storage', () => {
        spyOn(sessionStorageMock, 'getItem').and.returnValue('"xxx"');
        spyOn(localStorageMock, 'getItem').and.returnValue('"yyy"');

        spyOn(sessionStorageMock, 'setItem').and.stub();
        spyOn(localStorageMock, 'setItem').and.stub();
        spyOn(sessionStorageMock, 'removeItem').and.stub();
        spyOn(localStorageMock, 'removeItem').and.stub();

        const state = {
          access_token: undefined,
          refresh_token: undefined,
        };

        const result = reducer(state, { type: 'AN-ACTION' });
        expect(result).toEqual(state);
        expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(
          'access_token'
        );
        expect(localStorageMock.removeItem).toHaveBeenCalledWith(
          'refresh_token'
        );
        expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
      });
    });
  });

  describe('rehydrate', () => {
    it('should return an empty object when rehydrate is configured to false', () => {
      const config = {
        state: { storageSync: { rehydrate: false } },
      } as StateConfig;
      expect(rehydrate(config, winRef)).toEqual({});
    });
    it('should return a rehydrated state', () => {
      const sessionStorageValue = '"access token value"';
      spyOn(sessionStorageMock, 'getItem').and.returnValue(sessionStorageValue);
      const localStorageValue = '"refresh token value"';
      spyOn(localStorageMock, 'getItem').and.returnValue(localStorageValue);

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
            access_token: 'access token value',
            refresh_token: 'refresh token value',
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
});
