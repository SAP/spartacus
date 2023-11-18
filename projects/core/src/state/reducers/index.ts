/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  InjectionToken,
  Optional,
  PLATFORM_ID,
  Provider,
  TransferState,
} from '@angular/core';

import { META_REDUCERS } from '@ngrx/store';
import { AuthStatePersistenceService } from '../../auth/user-auth/services/auth-state-persistence.service';
import { Config } from '../../config/config-tokens';
import { getTransferStateReducer } from './transfer-state.reducer';

export { getStateSlice } from '../utils/get-state-slice';
export * from './transfer-state.reducer';

export const TRANSFER_STATE_META_REDUCER = new InjectionToken(
  'TransferStateMetaReducer'
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
    provide: META_REDUCERS,
    useExisting: TRANSFER_STATE_META_REDUCER,
    multi: true,
  },
];
