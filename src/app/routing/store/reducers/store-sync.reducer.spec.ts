import * as fromStoreSync from './store-sync.reducer';
import { ActionReducer } from '@ngrx/store';

fdescribe('Store Sync reducer', () => {
  describe('storageSyncReducer function', () => {
    it('should return proper localStorageSync function', () => {
      const result = fromStoreSync.storageSyncReducer(<ActionReducer<any>>{});
      console.log(`log: ${result}`);
    });
  });
});
