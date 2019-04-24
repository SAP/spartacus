import { StateConfig } from './state-config';

export const DEFAULT_LOCAL_STORAGE_KEY = 'spartacus-local-data';
export const DEFAULT_SESSION_STORAGE_KEY = 'spartacus-session-data';

export const defaultStateConfig: StateConfig = {
  state: {
    storageSync: {
      localStorageKeyName: DEFAULT_LOCAL_STORAGE_KEY,
      sessionStorageKeyName: DEFAULT_SESSION_STORAGE_KEY,
      keys: {},
    },
  },
};
