/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';
import { FeatureToggles, provideDefaultConfigFactory } from '@spartacus/core';
import { OccSavedCartAdapter } from './adapters/occ-saved-cart.adapter';
import {
  defaultOccSavedCartConfig,
  newDefaultOccSavedCartConfig,
} from './config/default-occ-saved-cart-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfigFactory(() => {
      const featureToggle: FeatureToggles = inject(FeatureToggles);
      return featureToggle.newOccDefaultEndpointForSaveCartAndCloneSavedCart
        ? newDefaultOccSavedCartConfig
        : defaultOccSavedCartConfig;
    }),
    {
      provide: SavedCartAdapter,
      useClass: OccSavedCartAdapter,
    },
  ],
})
export class SavedCartOccModule {}
