/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { Optional, PLATFORM_ID, Provider, TransferState } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { StateConfig, StateTransferType } from '../config/state-config';
import { filterKeysByType, getStateSlice } from '../utils/get-state-slice';
import { CX_KEY } from './transfer-state.reducer';

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
