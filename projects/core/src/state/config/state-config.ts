/* tslint:disable:no-bitwise */
export enum StateConfigType {
  NO_STORAGE = 1 << 0,
  LOCAL_STORAGE = 1 << 1,
  SESSION_STORAGE = 1 << 2,
  TRANSFER_STATE = 1 << 3,
}
/* tslint:enable:no-bitwise */

export type KeysType = {
  [key: string]: StateConfigType;
};

export abstract class StateConfig {
  state?: {
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
     * A set of state keys that should be synced with the specified browser's storage, or
     * that should be SSR-ed.
     *
     * Example:
      ```ts
      keys: {
        'auth.userToken.token': StateConfig.LOCAL_STORAGE | StateConfig.TRANSFER_STATE
      }
      ```
     * This will sync the specified slice of the state to the `localStorage` and transfer it.
     */
    keys?: KeysType;
  };
}
