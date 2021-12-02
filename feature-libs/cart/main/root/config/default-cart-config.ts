import { StorageSyncType } from '@spartacus/core';
import { CartConfig } from './cart-config';

export const defaultCartConfig: CartConfig = {
  cart: {
    validation: {
      enabled: false,
    },
    selectiveCart: {
      enabled: false,
    },
    storageType: StorageSyncType.LOCAL_STORAGE,
  },
};
