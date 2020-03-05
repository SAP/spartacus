import { Action, ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { deepMerge } from '../../config/utils/deep-merge';
import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';
import { filterKeysByType, getStateSlice } from '../utils/get-state-slice';

export function getStorageSyncReducer<T>(
  winRef: WindowRef,
  config?: StateConfig
): MetaReducer<T, Action> {
  if (
    !winRef.nativeWindow ||
    !config ||
    !config.state ||
    !config.state.storageSync ||
    !config.state.storageSync.keys
  ) {
    return reducer => reducer;
  }

  const storageSyncConfig = config.state.storageSync;

  return (reducer: ActionReducer<T, Action>): ActionReducer<T, Action> => {
    return (state, action): T => {
      const newState = reducer(state, action);

      if (action.type === INIT || action.type === UPDATE) {
        const rehydratedState = rehydrate(config, winRef);
        return deepMerge({}, newState, rehydratedState);
      }

      if (action.type !== INIT) {
        // handle local storage
        const localStorageKeys = filterKeysByType(
          storageSyncConfig.keys,
          StorageSyncType.LOCAL_STORAGE
        );
        const localStorageExclusionKeys = filterKeysByType(
          storageSyncConfig.excludeKeys,
          StorageSyncType.LOCAL_STORAGE
        );
        const localStorageStateSlices = getStateSlice(
          localStorageKeys,
          localStorageExclusionKeys,
          newState
        );
        persistToStorage(
          config.state.storageSync.localStorageKeyName,
          localStorageStateSlices,
          winRef.localStorage
        );

        // handle session storage
        const sessionStorageKeys = filterKeysByType(
          storageSyncConfig.keys,
          StorageSyncType.SESSION_STORAGE
        );
        const sessionStorageExclusionKeys = filterKeysByType(
          storageSyncConfig.excludeKeys,
          StorageSyncType.SESSION_STORAGE
        );
        const sessionStorageStateSlices = getStateSlice(
          sessionStorageKeys,
          sessionStorageExclusionKeys,
          newState
        );
        persistToStorage(
          config.state.storageSync.sessionStorageKeyName,
          sessionStorageStateSlices,
          winRef.sessionStorage
        );
      }

      return newState;
    };
  };
}

export function rehydrate<T>(config: StateConfig, winRef: WindowRef): T {
  const localStorageValue = readFromStorage(
    winRef.localStorage,
    config.state.storageSync.localStorageKeyName
  );
  const sessionStorageValue = readFromStorage(
    winRef.sessionStorage,
    config.state.storageSync.sessionStorageKeyName
  );

  return deepMerge(localStorageValue, sessionStorageValue);
}

export function exists(value: Object): boolean {
  if (value != null) {
    if (typeof value === 'object') {
      return Object.keys(value).length !== 0;
    }
    return value !== '';
  }
  return false;
}

export function getStorage(
  storageType: StorageSyncType,
  winRef: WindowRef
): Storage {
  let storage: Storage;

  switch (storageType) {
    case StorageSyncType.LOCAL_STORAGE: {
      storage = winRef.localStorage;
      break;
    }
    case StorageSyncType.SESSION_STORAGE: {
      storage = winRef.sessionStorage;
      break;
    }
    case StorageSyncType.NO_STORAGE: {
      storage = undefined;
      break;
    }

    default: {
      storage = winRef.sessionStorage;
    }
  }

  return storage;
}

export function persistToStorage(
  configKey: string,
  value: any,
  storage: Storage
): void {
  if (!isSsr(storage) && value) {
    storage.setItem(configKey, JSON.stringify(value));
  }
}

export function readFromStorage(storage: Storage, key: string): any {
  if (isSsr(storage)) {
    return;
  }

  const storageValue = storage.getItem(key);
  if (!storageValue) {
    return;
  }

  return JSON.parse(storageValue);
}

export function isSsr(storage: Storage): boolean {
  return !Boolean(storage);
}
