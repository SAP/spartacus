import { getStorageSyncReducer } from './store-sync.reducer';
import { StateConfig, StorageSyncType } from '../config/state-config';

describe('get store Sync reducer', () => {
  it('should return a proper localStorageSync function', () => {
    const config: StateConfig = {
      state: { storageSync: { type: StorageSyncType.SESSION_STORAGE } }
    };

    const winRef: any = {};

    const result = getStorageSyncReducer(config, winRef);

    expect(result).toEqual(jasmine.any(Function));
  });
});
