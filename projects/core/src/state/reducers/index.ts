import { InjectionToken, Optional, PLATFORM_ID, Provider } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { META_REDUCERS } from '@ngrx/store';
import { AuthStatePersistenceService } from '../../auth/user-auth/services/auth-state-persistence.service';
import { Config } from '../../config/config-tokens';
import { WindowRef } from '../../window/window-ref';
import { getStorageSyncReducer } from './storage-sync.reducer';
import { getTransferStateReducer } from './transfer-state.reducer';

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
      [new Optional(), AuthStatePersistenceService],
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
