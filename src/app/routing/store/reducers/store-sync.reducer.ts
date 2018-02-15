import { ConfigService } from './../../config.service';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

function storageConfig(config: ConfigService): LocalStorageConfig {
  const storageType = config.determineStorage();
  return {
    keys: ['user'],
    rehydrate: true,
    storage: storageType ? storageType : sessionStorage
  };
}

export function getStorageSyncReducerFunction(
  config: ConfigService
): MetaReducer<any> {
  const storage = storageConfig(config);

  return function(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(storage)(reducer);
  };
}
