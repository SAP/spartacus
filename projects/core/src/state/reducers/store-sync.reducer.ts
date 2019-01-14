import { ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';

function storageConfig(
  config: StateConfig,
  winRef: WindowRef
): LocalStorageConfig {
  let storage;
  switch (config.state.storageSync.type) {
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
    keys: config.state.storageSync.keys,
    rehydrate: true,
    storage: storage ? storage : winRef.sessionStorage
  };
}

export function getStorageSyncReducer(
  config: StateConfig,
  winRef: WindowRef
): MetaReducer<any, Action> {

  if (
    !winRef.nativeWindow ||
    !config.state.storageSync ||
    config.state.storageSync.type === StorageSyncType.NO_STORAGE ||
    !config.state.storageSync.keys
  ) {
    return undefined;
  }

  const storage = storageConfig(config, winRef);

  return function(
    reducer: ActionReducer<any, Action>
  ): ActionReducer<any, Action> {
    return localStorageSync(storage)(reducer);
  };
}
