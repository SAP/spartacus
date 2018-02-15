import { Injectable } from '@angular/core';

export enum StorageSyncType {
  NO_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE
}

@Injectable()
export class ConfigService {
  storageSyncType: StorageSyncType = StorageSyncType.SESSION_STORAGE;
}
