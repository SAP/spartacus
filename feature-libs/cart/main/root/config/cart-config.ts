import { Injectable } from '@angular/core';
import { Config, StorageSyncType } from '@spartacus/core';
// Imported for side effects (module augmentation)
import '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CartConfig {
  cart?: {
    selectiveCart?: {
      enabled?: boolean;
    };
    validation?: {
      enabled?: boolean;
    };
    storageType?:
      | StorageSyncType.LOCAL_STORAGE
      | StorageSyncType.SESSION_STORAGE;
  };
}

declare module '@spartacus/core' {
  interface Config extends CartConfig {}
}
