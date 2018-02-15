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
  switch (config.storageSyncType) {
    case StorageSyncType.LOCAL_STORAGE: {
      return localStorage;
    }
    case StorageSyncType.SESSION_STORAGE: {
      return sessionStorage;
    }
  }
}

export function storageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync(storageConfig())(reducer);
}
