/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';
import {
  FeatureToggles,
  OccConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OccSavedCartAdapter } from './adapters/occ-saved-cart.adapter';
import { defaultOccSavedCartConfig } from './config/default-occ-saved-cart-config';

export function defaultOccSavedCartConfigFactory(): OccConfig {
  const featureToggles = inject(FeatureToggles);

  return {
    backend: {
      occ: {
        endpoints: {
          ...defaultOccSavedCartConfig?.backend?.occ?.endpoints,
          cloneSavedCart:
            featureToggles.occCartNameAndDescriptionInHttpRequestBody
              ? '/users/${userId}/carts/${cartId}/clonesavedcart'
              : '/users/${userId}/carts/${cartId}/clonesavedcart?name=${saveCartName}',
        },
      },
    },
  };
}

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfigFactory(defaultOccSavedCartConfigFactory),
    {
      provide: SavedCartAdapter,
      useClass: OccSavedCartAdapter,
    },
  ],
})
export class SavedCartOccModule {}
