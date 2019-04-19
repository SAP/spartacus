import { Action, ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { deepMerge } from '../../config/utils/deep-merge';
import { WindowRef } from '../../window/window-ref';
import { StateConfig, StorageSyncType } from '../config/state-config';

// TODO:#sync-poc - all functions expect the main reducer should not be exported
export function getStorageSyncReducer<T>(
  winRef: WindowRef,
  config?: StateConfig
  // TODO:#sync-poc - pass a third dependency that will read from the `localStorage` whether the cookie consent was given or not
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
          const configuredStorage = getStorage(configuredStorageType, winRef);

          const newStateValue = resolveStateValue(configKey, newState);
          if (!exists(newStateValue)) {
            configuredStorage.removeItem(configKey);
            continue;
          }

          persistToStorage(configKey, newStateValue, configuredStorage);

          const stateShellObject = createShellObject(configKey, newStateValue);
          modifiedNewState = {
            ...modifiedNewState,
            ...stateShellObject,
          };
        }

        newState = deepMerge(newState, modifiedNewState);
      }

      return newState;
    };
  };
}

function rehydrate(config: StateConfig, winRef: WindowRef): Object {
  const storageSyncConfig = config.state.storageSync;

  let rehydratedState: Object;
  for (const configKey of Object.keys(storageSyncConfig.keys)) {
    const configuredStorageType = storageSyncConfig.keys[
      configKey
    ] as StorageSyncType;
    const configuredStorage = getStorage(configuredStorageType, winRef);
    const storageValue = resolveStorageValue(configuredStorage, configKey);

    const storageShellObject = createShellObject(configKey, storageValue);
    rehydratedState = {
      ...rehydratedState,
      ...storageShellObject,
    };
  }

  return rehydratedState;
}

// TODO:#sync-poc - test with a number, boolean, string and a complex object
function exists(value: Object): boolean {
  if (value != null) {
    if (typeof value === 'object') {
      return Object.keys(value).length !== 0;
    } else {
      return true;
    }
  }

  return false;
}

function persistToStorage(
  configKey: string,
  value: Object,
  storage: Storage
): void {
  if (value) {
    storage.setItem(configKey, JSON.stringify(value));
  }
}

export function getStorage(
  storageType: StorageSyncType,
  winRef: WindowRef
): Storage {
  // default
  let storage = winRef.sessionStorage;

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
  }

  return storage;
}

// TODO:#sync-poc - fool around with generics, or use `Object` or `any`?
// TODO:#sync-poc rename method to something more generic, because it's traversing an object by a string path
export function resolveStateValue<T, E>(key: string, object: E): T {
  if (!key) {
    return;
  }

  const keySplit: string[] = key.split('.');
  // not a nested object
  if (!keySplit) {
    return object[key];
  }

  // resolve nested objects
  return keySplit.reduce(
    (previous, current) => (previous ? previous[current] : null),
    object
  );
}

export function createShellObject(key: string, value: Object): Object {
  if (!key || !value || Object.keys(value).length === 0) {
    return {};
  }

  const keySplit: string[] = key.split('.');
  const newObject = {};
  let tempNewObject = newObject;

  for (let i = 0; i < keySplit.length; i++) {
    const currentKey = keySplit[i];
    // last iteration
    if (i === keySplit.length - 1) {
      tempNewObject = tempNewObject[currentKey] = value;
    } else {
      tempNewObject = tempNewObject[currentKey] = {};
    }
  }

  return newObject;
}

function resolveStorageValue(storage: Storage, key: string): Object {
  if (!storage) {
    return;
  }

  const storageValue = storage.getItem(key);
  return JSON.parse(storageValue);
}
