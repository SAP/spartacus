export enum StorageSyncType {
  NO_STORAGE = 'NO_STORAGE',
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  SESSION_STORAGE = 'SESSION_STORAGE'
}

export abstract class RoutingModuleConfig {
  storageSyncType?: StorageSyncType;
}
