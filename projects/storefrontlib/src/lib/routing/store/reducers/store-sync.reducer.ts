import { ConfigService, StorageSyncType } from './../../config.service';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

function storageConfig(config: ConfigService): LocalStorageConfig {
  let storage;
  switch (config.storageSyncType) {
    case StorageSyncType.LOCAL_STORAGE: {
      storage = localStorage;
      break;
    }
    case StorageSyncType.SESSION_STORAGE: {
      storage = sessionStorage;
      break;
    }
  }
  return {
    keys: [{ user: ['auth'] }, { cart: ['active'] }],
    rehydrate: true,
    storage: storage ? storage : sessionStorage
  };
}

export function getStorageSyncReducer(config: ConfigService): MetaReducer<any> {
  const storage = storageConfig(config);

  return function(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(storage)(reducer);
  };
}
