import { ConfigService, StorageSyncType } from './../../config.service';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

function storageConfig(config: ConfigService): LocalStorageConfig {
  let storage;
  switch (config.storageSyncType) {
    case StorageSyncType.LOCAL_STORAGE: {
      // UNIVERSAL PLUMB
      storage = {}; // localStorage;
      break;
    }
    case StorageSyncType.SESSION_STORAGE: {
      // UNIVERSAL PLUMB
      storage = {}; // sessionStorage;
      break;
    }
  }
  return {
    keys: [{ user: ['auth'] }, { cart: ['active'] }],
    rehydrate: true,
    storage: storage // UINVERSAL PLUMB  ? storag : sessionStorage
  };
}

export function getStorageSyncReducer(config: ConfigService): MetaReducer<any> {
  const storage = storageConfig(config);

  return function(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(storage)(reducer);
  };
}
