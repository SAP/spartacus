/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CartValidationAdapter,
  CartVoucherAdapter,
} from '@spartacus/cart/base/core';
import {
  CART_NORMALIZER,
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
} from '@spartacus/cart/base/root';
import { provideDefaultConfig } from '@spartacus/core';
import { adapterProviders } from './adapters/adapter-providers';
import { OccCartNormalizer } from './adapters/converters/occ-cart-normalizer';
import { OrderEntryPromotionsNormalizer } from './adapters/converters/order-entry-promotions-normalizer';
import { defaultOccCartConfig } from './adapters/default-occ-cart-config';
import { OccCartValidationAdapter } from './adapters/occ-cart-validation.adapter';
import { OccCartVoucherAdapter } from './adapters/occ-cart-voucher.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCartConfig),
    ...adapterProviders,
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
