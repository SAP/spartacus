import { WindowRef } from '../../window/window-ref';
import { StorageSyncType } from '../config/state-config';

export function getStorage(
  storageType: StorageSyncType,
  winRef: WindowRef
): Storage | undefined {
  let storage: Storage | undefined;

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
  storage: Storage | undefined
): void {
  if (!isSsr(storage) && value) {
    storage?.setItem(configKey, JSON.stringify(value));
  }
}

export function readFromStorage(
  storage: Storage | undefined,
  key: string
): unknown {
  if (isSsr(storage)) {
    return;
  }

  const storageValue = storage?.getItem(key);
  if (!storageValue) {
    return;
  }

  return JSON.parse(storageValue);
}

export function isSsr(storage?: Storage): boolean {
  return !Boolean(storage);
}
