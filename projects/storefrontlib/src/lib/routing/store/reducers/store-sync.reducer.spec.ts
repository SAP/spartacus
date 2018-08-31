import { getStorageSyncReducer } from './store-sync.reducer';
import { StorageSyncType } from '../../routing-module-config';

class MockRoutingModuleConfig {
  storageSyncType;
}

describe('get store Sync reducer', () => {
  it('should return a proper localStorageSync function', () => {
    const config = new MockRoutingModuleConfig();
    config.storageSyncType = StorageSyncType.SESSION_STORAGE;

    const result = getStorageSyncReducer(config);

    expect(result).toEqual(jasmine.any(Function));
  });
});
