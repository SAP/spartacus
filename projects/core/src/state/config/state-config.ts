export enum StorageSyncType {
  NO_STORAGE = 'NO_STORAGE',
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  SESSION_STORAGE = 'SESSION_STORAGE',
}

export abstract class StateConfig {
  state?: {
    storageSync?: {
      /**
       * A flag whether to sync browser's storage with the state when the app starts.
       * By default, it's set to `true`.
       */
      rehydrate?: boolean;
      /**
       * A set of state keys that should be synced with the specified browser's storage.
       */
      keys?: {
        [key: string]: StorageSyncType;
      };
    };
    ssrTransfer?: {
      keys?: object;
    };
  };
}
