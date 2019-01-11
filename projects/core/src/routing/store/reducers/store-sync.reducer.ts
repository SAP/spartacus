import {
  RoutingModuleConfig,
  StorageSyncType
} from '../../config/routing-module-config';
import { ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { WindowRef } from '../../../window/window-ref';

function storageConfig(
  config: RoutingModuleConfig,
  winRef: WindowRef
): LocalStorageConfig {
  let storage;
  switch (config.storageSyncType) {
    case StorageSyncType.LOCAL_STORAGE: {
      storage = winRef.localStorage;
      break;
    }
    case StorageSyncType.SESSION_STORAGE: {
      storage = winRef.sessionStorage;
      break;
    }
  }
  return {
    keys: [{ auth: ['userToken', 'clientToken'] }],
    rehydrate: true,
    storage: storage ? storage : winRef.sessionStorage
  };
}

export function getStorageSyncReducer(
  config: RoutingModuleConfig,
  winRef: WindowRef
): MetaReducer<any, Action> {
  const storage = storageConfig(config, winRef);

  return function(
    reducer: ActionReducer<any, Action>
  ): ActionReducer<any, Action> {
    return localStorageSync(storage)(reducer);
  };
}
