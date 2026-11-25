/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { TransferState } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { FeatureToggles } from '../../features-config/feature-toggles/feature-toggles-tokens';
import { StateConfig, StateTransferType } from '../config/state-config';
import { filterKeysByType, getStateSlice } from '../utils/get-state-slice';
import { CX_KEY } from './transfer-state.reducer';

export async function serializeNgrxStateToTransferState(
  store: Store,
  transferState: TransferState,
  config: StateConfig | null,
  platformId: Object,
  featureToggles: FeatureToggles | null
): Promise<void> {
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
}
