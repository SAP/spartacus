import { Optional, PLATFORM_ID, Provider } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { META_REDUCERS } from '@ngrx/store';
import { Config } from '../../config/config.module';
import { WindowRef } from '../../window/window-ref';
import { getStorageSyncReducer } from './storage-sync.reducer';
import { getTransferStateReducer } from './transfer-state.reducer';

export { getStateSlice } from '../utils/get-state-slice';
export { getStorageSyncReducer } from './storage-sync.reducer';
export * from './transfer-state.reducer';

export const stateMetaReducers: Provider[] = [
  {
    provide: META_REDUCERS,
    useFactory: getTransferStateReducer,
    deps: [
      PLATFORM_ID,
      [new Optional(), TransferState],
      [new Optional(), Config],
    ],
    multi: true,
  },
  {
    provide: META_REDUCERS,
    useFactory: getStorageSyncReducer,
    deps: [WindowRef, [new Optional(), Config]],
    multi: true,
  },
];
