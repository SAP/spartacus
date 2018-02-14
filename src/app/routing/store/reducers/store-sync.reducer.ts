import { ConfigService, StorageSyncType } from './../../config.service';
import { ActionReducer } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

function storageConfig(): LocalStorageConfig {
  const config = new ConfigService();
  const storageType = determineStorage(config);
  return {
    keys: ['user'],
    rehydrate: true,
    storage: storageType ? storageType : sessionStorage
  };
}

function determineStorage(config: ConfigService): Storage {
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

  return storage;
}

export function storageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync(storageConfig())(reducer);
}
