import { getStorageSyncReducer } from './store-sync.reducer';
import { StateConfig, StorageSyncType } from '../config/state-config';

describe('get store Sync reducer', () => {
  it('should return a proper localStorageSync function', () => {
    const config: StateConfig = {
      state: {
        storageSync: { type: StorageSyncType.SESSION_STORAGE, keys: [] }
      }
    };

    const winRef: any = { nativeWindow: {} };

    const result = getStorageSyncReducer(config, winRef);

    expect(result).toEqual(jasmine.any(Function));
  });

  it('should not return a reducer if not in browser context', () => {
    const config: StateConfig = {
      state: {
        storageSync: { type: StorageSyncType.SESSION_STORAGE, keys: [] }
      }
    };

    const winRef: any = {};

    const result = getStorageSyncReducer(config, winRef);

    expect(result).toEqual(undefined);
  });

  it('should not return a reducer when keys are not defined', () => {
    const config: StateConfig = {
      state: { storageSync: { type: StorageSyncType.SESSION_STORAGE } }
    };

    const winRef: any = { nativeWindow: {} };

    const result = getStorageSyncReducer(config, winRef);

    expect(result).toEqual(undefined);
  });

  it('should not return a reducer if storage sync type is set to NO_STORAGE', () => {
    const config: StateConfig = {
      state: { storageSync: { type: StorageSyncType.NO_STORAGE, keys: [] } }
    };

    const winRef: any = { nativeWindow: {} };

    const result = getStorageSyncReducer(config, winRef);

    expect(result).toEqual(undefined);
  });
});
