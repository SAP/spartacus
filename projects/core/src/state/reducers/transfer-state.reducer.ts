/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { INIT } from '@ngrx/store';
import { AuthStatePersistenceService } from '../../auth/user-auth/services/auth-state-persistence.service';
import { deepMerge } from '../../config/utils/deep-merge';
import { StateConfig, StateTransferType } from '../config/state-config';
import { filterKeysByType, getStateSlice } from '../utils/get-state-slice';
import { makeStateKey, StateKey, TransferState } from '@angular/core';

export const CX_KEY: StateKey<string> = makeStateKey<string>('cx-state');

export function getTransferStateReducer(
  platformId: Object,
  transferState?: TransferState,
  config?: StateConfig,
  authStatePersistenceService?: AuthStatePersistenceService
) {
  if (transferState && config?.state?.ssrTransfer?.keys) {
    if (isPlatformBrowser(platformId)) {
      return getBrowserTransferStateReducer(
        transferState,
        config.state.ssrTransfer.keys,
        Boolean(authStatePersistenceService?.isUserLoggedIn())
      );
    } else if (isPlatformServer(platformId)) {
      return getServerTransferStateReducer(
        transferState,
        config.state.ssrTransfer.keys
      );
    }
  }

  return (reducer: any) => reducer;
}

export function getServerTransferStateReducer(
  transferState: TransferState,
  keys: { [key: string]: StateTransferType }
) {
  const transferStateKeys = filterKeysByType(
    keys,
    StateTransferType.TRANSFER_STATE
  );

  return function (reducer: any) {
    return function (state: any, action: any) {
      const newState = reducer(state, action);
      if (newState) {
        const stateSlice = getStateSlice(transferStateKeys, [], newState);
        transferState.set(CX_KEY, stateSlice);
      }

      return newState;
    };
  };
}

export function getBrowserTransferStateReducer(
  transferState: TransferState,
  keys: { [key: string]: StateTransferType },
  isLoggedIn: boolean
) {
  const transferStateKeys = filterKeysByType(
    keys,
    StateTransferType.TRANSFER_STATE
  );

  return function (reducer: any) {
    return function (state: any, action: any) {
      if (action.type === INIT) {
        if (!state) {
          state = reducer(state, action);
        }

        if (!isLoggedIn && transferState.hasKey(CX_KEY)) {
          const cxKey = transferState.get<Object>(CX_KEY, {});
          const transferredStateSlice = getStateSlice(
            transferStateKeys,
            [],
            cxKey
          );

          state = deepMerge({}, state, transferredStateSlice);
        }
        return state;
      }
      return reducer(state, action);
    };
  };
}
