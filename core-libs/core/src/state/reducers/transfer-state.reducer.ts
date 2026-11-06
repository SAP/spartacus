/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { inject, makeStateKey, StateKey, TransferState } from '@angular/core';
import { Store, INIT } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AuthStatePersistenceService } from '../../auth/user-auth/services/auth-state-persistence.service';
import { deepMerge } from '../../config/utils/deep-merge';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { StateConfig, StateTransferType } from '../config/state-config';
import { filterKeysByType, getStateSlice } from '../utils/get-state-slice';

export const CX_KEY: StateKey<string> = makeStateKey<string>('cx-state');

function isSsrTransferStateLazyWriteEnabled(): boolean {
  try {
    return !!inject(FeatureToggles).ssrTransferStateLazyWrite;
  } catch {
    return false;
  }
}

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
    }
  }

  return (reducer: any) => reducer;
}

export function getServerTransferStateReducer(
  transferState: TransferState,
  keys: { [key: string]: StateTransferType | undefined }
) {
  if (isSsrTransferStateLazyWriteEnabled()) {
    return (reducer: any) => reducer;
  }

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

export function getServerTransferStateOnSerializer(
  platformId: Object,
  store: Store,
  transferState?: TransferState,
  config?: StateConfig
): () => Promise<void> {
  return async () => {
    if (
      !isSsrTransferStateLazyWriteEnabled() ||
      !isPlatformServer(platformId) ||
      !transferState ||
      !config?.state?.ssrTransfer?.keys
    ) {
      return;
    }
    const transferStateKeys = filterKeysByType(
      config.state.ssrTransfer.keys,
      StateTransferType.TRANSFER_STATE
    );
    const state = await firstValueFrom(store);
    const stateSlice = getStateSlice(transferStateKeys, [], state);
    transferState.set(CX_KEY, stateSlice);
  };
}

export function getBrowserTransferStateReducer(
  transferState: TransferState,
  keys: { [key: string]: StateTransferType | undefined },
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
