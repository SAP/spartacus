import { Optional, PLATFORM_ID, Provider, InjectionToken } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { META_REDUCERS } from '@ngrx/store';
import { WindowRef } from '../../window/window-ref';
import { getStorageSyncReducer } from './storage-sync.reducer';
import { getTransferStateReducer } from './transfer-state.reducer';
import { Config } from '../../config/config-injectors';

export { getStateSlice } from '../utils/get-state-slice';
export { getStorageSyncReducer } from './storage-sync.reducer';
export * from './transfer-state.reducer';

export const TRANSFER_STATE_META_REDUCER = new InjectionToken(
  'TransferStateMetaReducer'
);
export const STORAGE_SYNC_META_REDUCER = new InjectionToken(
  'StorageSyncMetaReducer'
);

export const stateMetaReducers: Provider[] = [
  {
    provide: TRANSFER_STATE_META_REDUCER,
    useFactory: getTransferStateReducer,
    deps: [
      PLATFORM_ID,
      [new Optional(), TransferState],
      [new Optional(), Config],
    ],
  },
  {
    provide: STORAGE_SYNC_META_REDUCER,
    useFactory: getStorageSyncReducer,
    deps: [WindowRef, [new Optional(), Config]],
  },
  {
    provide: META_REDUCERS,
    useExisting: TRANSFER_STATE_META_REDUCER,
    multi: true,
  },
  {
    provide: META_REDUCERS,
    useExisting: STORAGE_SYNC_META_REDUCER,
    multi: true,
  },
];
