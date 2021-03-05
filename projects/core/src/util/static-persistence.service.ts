import { Injectable } from '@angular/core';
import { StorageSyncType } from '../state/config/state-config';
import * as storageSyncUtils from '../state/reducers/storage-sync.reducer';
import { WindowRef } from '../window/window-ref';

@Injectable({ providedIn: 'root' })
export class StaticPersistenceService {
  constructor(protected winRef: WindowRef) {}

  readStateFromStorage<T>({
    key,
    context = '',
    storageType = StorageSyncType.LOCAL_STORAGE,
  }: {
    key: string;
    context?: string | Array<string>;
    storageType?: StorageSyncType;
  }): T | undefined | string {
    const storage = storageSyncUtils.getStorage(storageType, this.winRef);

    const storageValue = storage.getItem(
      this.generateKeyWithContext(context, key)
    );
    if (!storageValue) {
      return;
    }

    if (storageValue.startsWith('{') && storageValue.endsWith('}')) {
      return JSON.parse(storageValue) as T;
    }
    return storageValue;
  }

  protected generateKeyWithContext(
    context: string | Array<string>,
    key: string
  ): string {
    return `spartacus⚿${[].concat(context).join('⚿')}⚿${key}`;
  }
}
