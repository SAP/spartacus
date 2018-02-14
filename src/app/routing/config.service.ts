import { Injectable } from '@angular/core';

export enum STORAGE_SYNC_TYPE {
  NO_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE
}

@Injectable()
export class ConfigService {
  storageSyncType: STORAGE_SYNC_TYPE = STORAGE_SYNC_TYPE.SESSION_STORAGE;
}
