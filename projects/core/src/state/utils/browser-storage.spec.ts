import { WindowRef } from '../../window/window-ref';
import { StorageSyncType } from '../config/state-config';
import {
  getStorage,
  isSsr,
  persistToStorage,
  readFromStorage,
} from './browser-storage';

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

describe('Browser storage utilities', () => {
  describe('getStorage', () => {
    describe('when no storage type is requested', () => {
      it(`should return winRef's default storage`, () => {
        const spy = spyOnProperty(winRef, 'sessionStorage', 'get').and.stub();
        getStorage(undefined as any, winRef);
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
        const result = readFromStorage(undefined as any, 'a');
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
      expect(isSsr(undefined as any)).toEqual(true);
    });
    it('should return false if the provided storage exists', () => {
      expect(isSsr(localStorageMock)).toEqual(false);
    });
  });
});
