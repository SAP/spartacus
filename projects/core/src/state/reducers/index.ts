import { Optional, PLATFORM_ID, Provider } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Config } from '../../config/config.module';
import { WindowRef } from '../../window/window-ref';
import { META_REDUCER } from '../meta-reducer';
import { getStorageSyncReducer } from './storage-sync.reducer';
import { getTransferStateReducer } from './transfer-state.reducer';

export { getStateSlice } from '../utils/get-state-slice';
export { getStorageSyncReducer } from './storage-sync.reducer';
export * from './transfer-state.reducer';

export const stateMetaReducers: Provider[] = [
  {
    provide: META_REDUCER,
    useFactory: getTransferStateReducer,
    deps: [
      PLATFORM_ID,
      [new Optional(), TransferState],
      [new Optional(), Config],
    ],
    multi: true,
  },
  {
    provide: META_REDUCER,
    useFactory: getStorageSyncReducer,
    deps: [WindowRef, [new Optional(), Config]],
    multi: true,
  },
];
