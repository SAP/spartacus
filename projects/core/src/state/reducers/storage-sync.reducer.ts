import { Action, ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { deepMerge } from '../../config/utils/deep-merge';
import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';
import { getStateSlice } from '../utils/get-state-slice';

// TODO:#sync-poc - make this configurable
export const DEFAULT_LOCAL_STORAGE_KEY = 'spartacus-local-data';
export const DEFAULT_SESSION_STORAGE_KEY = 'spartacus-session-data';

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
        const localStorageKeys = getKeysForStorage(
          storageSyncConfig.keys,
          StorageSyncType.LOCAL_STORAGE
        );
        const localStorageStateSlices = getStateSlice(localStorageKeys, state);
        persistToStorage(
          DEFAULT_LOCAL_STORAGE_KEY,
          localStorageStateSlices,
          winRef.localStorage
        );

        const sessionStorageKeys = getKeysForStorage(
          storageSyncConfig.keys,
          StorageSyncType.SESSION_STORAGE
        );
        const sessionStorageStateSlices = getStateSlice(
          sessionStorageKeys,
          state
        );
        persistToStorage(
          DEFAULT_SESSION_STORAGE_KEY,
          sessionStorageStateSlices,
          winRef.sessionStorage
        );
      }

      return newState;
    };
  };
}

export function getKeysForStorage(
  keys: { [key: string]: StorageSyncType },
  storageType: StorageSyncType
): string[] {
  return Object.keys(keys).filter(key => keys[key] === storageType);
}

export function rehydrate<T>(config: StateConfig, winRef: WindowRef): T {
  const storageSyncConfig = config.state.storageSync;
  if (!storageSyncConfig.rehydrate) {
    return {} as T;
  }

  const localStorageValue = readFromStorage(
    winRef.localStorage,
    DEFAULT_LOCAL_STORAGE_KEY
  );
  const sessionStorageValue = readFromStorage(
    winRef.sessionStorage,
    DEFAULT_SESSION_STORAGE_KEY
  );

  return deepMerge(localStorageValue, sessionStorageValue);
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
