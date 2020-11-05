import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

export enum StorageSyncType {
  NO_STORAGE = 'NO_STORAGE',
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  SESSION_STORAGE = 'SESSION_STORAGE',
}

export enum StateTransferType {
  TRANSFER_STATE = 'SSR',
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class StateConfig {
  state?: {
    /**
     * @deprecated since 3.0
     */
    storageSync?: {
      /**
       * A key name for the data stored in `localStorage`.
       * Default is `DEFAULT_LOCAL_STORAGE_KEY`.
       */
      localStorageKeyName?: string;
      /**
       * A key name for the data stored in `sessionStorage`.
       * Default is `DEFAULT_SESSION_STORAGE_KEY`.
       */
      sessionStorageKeyName?: string;
      /**
       * A set of state keys that should be synced with the specified browser's storage.
       */
      keys?: {
        [key: string]: StorageSyncType;
      };
      /**
       * A set of keys not to sync with the specified browser's storage.
       */
      excludeKeys?: {
        [key: string]: StorageSyncType;
      };
    };
    ssrTransfer?: {
      keys?: {
        /**
         * A set of state keys that should be transferred from server.
         */
        [key: string]: StateTransferType;
      };
    };
  };
}
