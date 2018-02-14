import { ConfigService, STORAGE_SYNC_TYPE } from './../../config.service';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';

// Angular CLI environment
import { environment } from './../../../../environments/environment';

function storageConfig(): LocalStorageConfig {
  const storageSyncConfig: LocalStorageConfig = {
    keys: ['user'],
    rehydrate: true
  };

  const config = new ConfigService();
  const storage = determineStorage(config);
  if (storage) {
    storageSyncConfig.storage = storage;
  }

  return storageSyncConfig;
}

function determineStorage(config: ConfigService): Storage {
  let storage;
  switch (config.storageSyncType) {
    case STORAGE_SYNC_TYPE.LOCAL_STORAGE: {
      storage = localStorage;
      break;
    }
    case STORAGE_SYNC_TYPE.SESSION_STORAGE: {
      storage = sessionStorage;
      break;
    }
  }

  return storage;
}

function storageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(storageConfig())(reducer);
}

export const metaReducers: MetaReducer<any>[] = [storageSyncReducer];
if (!environment.production) {
  metaReducers.push(storeFreeze);
}
