/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import {
  CartAdapter,
  CartEntryAdapter,
  CartValidationAdapter,
  CartVoucherAdapter,
} from '@spartacus/cart/base/core';
import {
  CART_NORMALIZER,
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
} from '@spartacus/cart/base/root';
import {
  FeatureToggles,
  provideDefaultConfigFactory,
  OccConfig,
} from '@spartacus/core';
import { OccCartNormalizer } from './adapters/converters/occ-cart-normalizer';
import { OrderEntryPromotionsNormalizer } from './adapters/converters/order-entry-promotions-normalizer';
import { OccCartEntryAdapter } from './adapters/occ-cart-entry.adapter';
import { OccCartValidationAdapter } from './adapters/occ-cart-validation.adapter';
import { OccCartVoucherAdapter } from './adapters/occ-cart-voucher.adapter';
import { OccCartAdapter } from './adapters/occ-cart.adapter';
import { defaultOccCartConfig } from './adapters/default-occ-cart-config';

export function defaultOccCartConfigFactory(): OccConfig {
  const featureToggles = inject(FeatureToggles);

  return {
    backend: {
      occ: {
        endpoints: {
          ...defaultOccCartConfig?.backend?.occ?.endpoints,
          saveCart: featureToggles.occCartNameAndDescriptionInHttpRequestBody
            ? '/users/${userId}/carts/${cartId}/save'
            : '/users/${userId}/carts/${cartId}/save?saveCartName=${saveCartName}&saveCartDescription=${saveCartDescription}',
        },
      },
    },
  };
}

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfigFactory(defaultOccCartConfigFactory),
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    {
      provide: CART_NORMALIZER,
      useExisting: OccCartNormalizer,
      multi: true,
    },
    {
      provide: ORDER_ENTRY_PROMOTIONS_NORMALIZER,
      useExisting: OrderEntryPromotionsNormalizer,
      multi: true,
    },
    {
      provide: CartEntryAdapter,
      useClass: OccCartEntryAdapter,
    },
    {
      provide: CartVoucherAdapter,
      useClass: OccCartVoucherAdapter,
    },
    {
      provide: CartValidationAdapter,
      useClass: OccCartValidationAdapter,
    },
  ],
})
export class CartBaseOccModule {}
