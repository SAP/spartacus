import { getStorageSyncReducer } from './store-sync.reducer';

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
