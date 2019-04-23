import { Action, ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { deepMerge } from '../../config/utils/deep-merge';
import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';
import {
  createShellObject,
  getStateSliceValue,
} from '../utils/get-state-slice';

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
    return undefined;
  }

  const storageSyncConfig = config.state.storageSync;

  return (reducer: ActionReducer<T, Action>): ActionReducer<T, Action> => {
    return (state, action): T => {
      const oldState = { ...state };
      let newState = { ...oldState };

      if (action.type === INIT && !exists(newState)) {
        newState = reducer(state, action);
      }

      if (
        storageSyncConfig.rehydrate &&
        (action.type === INIT || action.type === UPDATE)
      ) {
        const rehydratedState = rehydrate(config, winRef);
        return deepMerge(newState, rehydratedState);
      }

      newState = reducer(newState, action);

      if (action.type !== INIT) {
        let modifiedNewState = {};
        for (const configKey of Object.keys(storageSyncConfig.keys)) {
          const configuredStorageType = storageSyncConfig.keys[
            configKey
          ] as StorageSyncType;
          if (configuredStorageType === StorageSyncType.NO_STORAGE) {
            continue;
          }

          const configuredStorage = getStorage(configuredStorageType, winRef);
          const newStateValue = getStateSliceValue(configKey, newState);
          if (!isSsr(configuredStorage) && !exists(newStateValue)) {
            configuredStorage.removeItem(configKey);
            continue;
          }

          persistToStorage(configKey, newStateValue, configuredStorage);

          const stateShellObject = createShellObject(configKey, newStateValue);
          modifiedNewState = deepMerge(modifiedNewState, stateShellObject);
        }

        newState = deepMerge(newState, modifiedNewState);
      }

      return newState;
    };
  };
}

export function rehydrate(config: StateConfig, winRef: WindowRef): Object {
  const storageSyncConfig = config.state.storageSync;
  if (!storageSyncConfig.rehydrate) {
    return {};
  }

  let rehydratedState: Object;
  for (const configKey of Object.keys(storageSyncConfig.keys)) {
    const configuredStorageType = storageSyncConfig.keys[
      configKey
    ] as StorageSyncType;
    const configuredStorage = getStorage(configuredStorageType, winRef);
    const storageValue = readFromStorage(configuredStorage, configKey);

    const storageShellObject = createShellObject(configKey, storageValue);
    rehydratedState = deepMerge(rehydratedState, storageShellObject);
  }

  return rehydratedState;
}

export function exists(value: Object): boolean {
  if (value != null) {
    if (typeof value === 'object') {
      return Object.keys(value).length !== 0;
    } else if (value === '') {
      return false;
    } else {
      return true;
    }
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
  value: Object,
  storage: Storage
): void {
  if (!isSsr(storage) && value) {
    storage.setItem(configKey, JSON.stringify(value));
  }
}

export function readFromStorage(storage: Storage, key: string): Object {
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
