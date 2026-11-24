/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Optional,
  PLATFORM_ID,
  Provider,
  TransferState,
  makeStateKey,
  StateKey,
} from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { INIT, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AuthStatePersistenceService } from '../../auth/user-auth/services/auth-state-persistence.service';
import { deepMerge } from '../../config/utils/deep-merge';
import { StateConfig, StateTransferType } from '../config/state-config';
import { filterKeysByType, getStateSlice } from '../utils/get-state-slice';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';

export const CX_KEY: StateKey<string> = makeStateKey<string>('cx-state');

export function getTransferStateReducer(
  platformId: Object,
  transferState?: TransferState,
  config?: StateConfig,
  authStatePersistenceService?: AuthStatePersistenceService,
  featureToggles?: FeatureToggles
) {
  if (transferState && config?.state?.ssrTransfer?.keys) {
    if (isPlatformBrowser(platformId)) {
      return getBrowserTransferStateReducer(
        transferState,
        config.state.ssrTransfer.keys,
        Boolean(authStatePersistenceService?.isUserLoggedIn())
      );
    } else if (
      isPlatformServer(platformId) &&
      !featureToggles?.ssrTransferStateBeforeAppSerialized
    ) {
      return getLegacyServerTransferStateReducer(
        transferState,
        config.state.ssrTransfer.keys
      );
    }
  }

  return (reducer: any) => reducer;
}

export function getLegacyServerTransferStateReducer(
  transferState: TransferState,
  keys: { [key: string]: StateTransferType | undefined }
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

export function getBeforeAppSerializedTransferStateProvider(): Provider {
  return {
    provide: BEFORE_APP_SERIALIZED,
    useFactory: (
      store: Store,
      transferState: TransferState,
      config: StateConfig | null,
      platformId: Object,
      featureToggles: FeatureToggles | null
    ) =>
      async (): Promise<void> => {
        if (
          !isPlatformServer(platformId) ||
          !featureToggles?.ssrTransferStateBeforeAppSerialized
        ) {
          return;
        }
        if (!config?.state?.ssrTransfer?.keys) {
          return;
        }

        const state = await firstValueFrom(store);
        if (state) {
          const transferStateKeys = filterKeysByType(
            config.state.ssrTransfer.keys,
            StateTransferType.TRANSFER_STATE
          );
          const stateSlice = getStateSlice(transferStateKeys, [], state);
          transferState.set(CX_KEY, stateSlice);
        }
      },
    deps: [
      Store,
      TransferState,
      [new Optional(), StateConfig],
      PLATFORM_ID,
      [new Optional(), FeatureToggles],
    ],
    multi: true,
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
