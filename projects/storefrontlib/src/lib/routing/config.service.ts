import { Injectable } from '@angular/core';

export class StorageSyncType {
  static NO_STORAGE = 'NO_STORAGE';
  static LOCAL_STORAGE = 'LOCAL_STORAGE';
  static SESSION_STORAGE = 'SESSION_STORAGE';
}
@Injectable()
export class ConfigService {
  storageSyncType: string = StorageSyncType.SESSION_STORAGE;
}
