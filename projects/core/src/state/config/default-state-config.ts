import { StateConfig, StorageSyncType } from './state-config';


export const defaultStateConfig: StateConfig = {
  state: {
    storageSync: {
      type: StorageSyncType.SESSION_STORAGE
    }
  }
};
