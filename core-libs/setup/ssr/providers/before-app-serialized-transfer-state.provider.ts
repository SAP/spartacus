/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Optional, PLATFORM_ID, Provider, TransferState } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { Store } from '@ngrx/store';
import {
  FeatureToggles,
  StateConfig,
  serializeNgrxStateToTransferState,
} from '@spartacus/core';

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
      (): Promise<void> =>
        serializeNgrxStateToTransferState(
          store,
          transferState,
          config,
          platformId,
          featureToggles
        ),
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
