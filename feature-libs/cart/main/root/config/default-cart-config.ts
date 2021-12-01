import { StorageSyncType } from 'projects/core/src/state';
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
