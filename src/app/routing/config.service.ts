import { Injectable } from '@angular/core';

export enum StorageSyncType {
  NO_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE
}

@Injectable()
export class ConfigService {
  private _storageSyncType: StorageSyncType = StorageSyncType.SESSION_STORAGE;

  set storageSyncType(type: StorageSyncType) {
    this._storageSyncType = type;
  }

  public determineStorage(): Storage {
    switch (this._storageSyncType) {
      case StorageSyncType.LOCAL_STORAGE: {
        return localStorage;
      }
      case StorageSyncType.SESSION_STORAGE: {
        return sessionStorage;
      }
    }
  }
}
