import { getStorageSyncReducer } from './store-sync.reducer';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

class MockConfigService {
  storageSyncType;
}

fdescribe('get store Sync reducer', () => {
  it('should return a proper localStorageSync function', () => {
    const config = new MockConfigService();
    config.storageSyncType = sessionStorage;

    const result = getStorageSyncReducer(config);

    expect(result).toEqual(jasmine.any(Function));
  });
});
