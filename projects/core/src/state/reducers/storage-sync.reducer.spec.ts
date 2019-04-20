import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';
import {
  exists,
  getStorage,
  persistToStorage,
  readFromStorage,
  rehydrate,
} from './storage-sync.reducer';

// TODO:#sync-poc - could this be used in other tests, i.e. `readFromStorage` and `persistToStorage`
const sessionStorageMock = {
  getItem(_key: string): string | null {
    return 'value';
  },
} as Storage;
const localStorageMock = {
  getItem(_key: string): string | null {
    return 'value';
  },
} as Storage;

const winRef = {
  get sessionStorage(): Storage {
    return sessionStorageMock;
  },
  get localStorage(): Storage {
    return localStorageMock;
  },
} as WindowRef;

fdescribe('storage-sync-reducer', () => {
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
    const storageMock = {
      setItem(_key: string, _value: string): void {},
    } as Storage;

    describe('when the provided value does NOT exist', () => {
      it('should NOT persist it', () => {
        spyOn(storageMock, 'setItem').and.stub();

        persistToStorage('a', undefined, storageMock);
        expect(storageMock.setItem).not.toHaveBeenCalled();
      });
    });
    describe('when the provided value exists', () => {
      it('should persist it', () => {
        spyOn(JSON, 'stringify').and.callThrough();
        spyOn(storageMock, 'setItem').and.stub();

        persistToStorage('a', 'xxx', storageMock);
        expect(JSON.stringify).toHaveBeenCalledWith('xxx');
        expect(storageMock.setItem).toHaveBeenCalledWith('a', '"xxx"');
      });
    });
  });

  describe('readFromStorage', () => {
    const storageMock = {
      getItem(_key: string): string | null {
        return 'value';
      },
    } as Storage;

    describe('when no storage is provided', () => {
      it('should return undefined', () => {
        const result = readFromStorage(null, 'a');
        expect(result).toBeUndefined();
      });
    });

    describe('when there is no value under the provided key', () => {
      it('should return undefined', () => {
        spyOn(storageMock, 'getItem').and.returnValue(undefined);
        const result = readFromStorage(storageMock, 'a');
        expect(result).toBeUndefined();
      });
    });

    describe('when there is no value under the provided key', () => {
      it('should return undefined', () => {
        spyOn(JSON, 'parse').and.callThrough();
        spyOn(storageMock, 'getItem').and.returnValue('"a"');

        const result = readFromStorage(storageMock, 'a');
        expect(JSON.parse).toHaveBeenCalledWith('"a"');
        expect(result).toEqual('a');
      });
    });
  });
});
