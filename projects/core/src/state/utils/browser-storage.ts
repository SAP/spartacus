/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isNotUndefined } from '../../util';
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

/**
 * Persists the given value to the given storage, piping it first through `JSON.stringify()`.
 *
 * Note: It silently refuses to save `undefined` values in storage.
 *       It's because `JSON.stringify()` returns the string `"undefined"` for `undefined`.
 *       And this string is not valid JSON so it would  cause a runtime `SyntaxError`
 *       in `readFromStorage()` when `JSON.parse()` is called with the string `"undefined"` as an argument.
 */
export function persistToStorage(
  configKey: string,
  value: any,
  storage: Storage
): void {
  if (!isSsr(storage) && isNotUndefined(value)) {
    storage.setItem(configKey, JSON.stringify(value));
  }
}

export function readFromStorage(storage: Storage, key: string): unknown {
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
