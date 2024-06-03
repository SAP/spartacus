/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { provideDefaultConfig } from '@spartacus/core';
import { OccCartNormalizer } from './adapters/converters/occ-cart-normalizer';
import { OrderEntryPromotionsNormalizer } from './adapters/converters/order-entry-promotions-normalizer';
import { defaultOccCartConfig } from './adapters/default-occ-cart-config';
import { OccCartEntryAdapter } from './adapters/occ-cart-entry.adapter';
import { OccCartValidationAdapter } from './adapters/occ-cart-validation.adapter';
import { OccCartVoucherAdapter } from './adapters/occ-cart-voucher.adapter';
import { OccCartAdapter } from './adapters/occ-cart.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCartConfig),
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
