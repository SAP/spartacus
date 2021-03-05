import { Injectable } from '@angular/core';
import { StorageSyncType } from '../state/config/state-config';
import * as storageSyncUtils from '../state/reducers/storage-sync.reducer';
import { generateKeyWithContext } from '../state/reducers/storage-sync.reducer';
import { WindowRef } from '../window/window-ref';

@Injectable({ providedIn: 'root' })
export class StaticPersistenceService {
  constructor(protected winRef: WindowRef) {}

  persistToStorage<T>(
    key: string,
    state: T,
    context: string | Array<string> = '',
    storageType = StorageSyncType.LOCAL_STORAGE
  ): void {
    const storage = storageSyncUtils.getStorage(storageType, this.winRef);

    storageSyncUtils.persistToStorage(
      generateKeyWithContext(context, key),
      state,
      storage
    );
  }

  readFromStorage<T>(
    key: string,
    context = '',
    storageType = StorageSyncType.LOCAL_STORAGE
  ): T | undefined | string {
    const storage = storageSyncUtils.getStorage(storageType, this.winRef);

    const storageValue = storage.getItem(generateKeyWithContext(context, key));
    if (!storageValue) {
      return;
    }

    if (storageValue.startsWith('{') && storageValue.endsWith('}')) {
      return JSON.parse(storageValue) as T;
    }
    return storageValue;
  }

  removeFromStorage(
    key: string,
    context = '',
    storageType = StorageSyncType.LOCAL_STORAGE
  ): void {
    const storage = storageSyncUtils.getStorage(storageType, this.winRef);

    if (Boolean(storage)) {
      storage.removeItem(generateKeyWithContext(context, key));
    }
  }
}
