import { StorageSyncType } from 'projects/core/src/state';
import { CartConfig } from './cart-config';

export const defaultCartConfig: CartConfig = {
  cart: {
    storageType: StorageSyncType.LOCAL_STORAGE,
  },
};
