import { getStorageSyncReducer } from './store-sync.reducer';
import {
  RoutingModuleConfig,
  StorageSyncType
} from '../../config/routing-module-config';

describe('get store Sync reducer', () => {
  it('should return a proper localStorageSync function', () => {
    const config: RoutingModuleConfig = {
      storageSyncType: StorageSyncType.SESSION_STORAGE
    };

    const result = getStorageSyncReducer(config);

    expect(result).toEqual(jasmine.any(Function));
  });
});
