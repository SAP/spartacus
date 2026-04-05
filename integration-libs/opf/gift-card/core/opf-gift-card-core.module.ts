/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfGiftCardCartOccNormalizer,
  OpfGiftCardOrderOccNormalizer,
} from './normalizers';

import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { NgModule } from '@angular/core';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OpfGiftCardConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    ...facadeProviders,
    OpfGiftCardConnector,
    {
      provide: CART_NORMALIZER,
      useExisting: OpfGiftCardCartOccNormalizer,
      multi: true,
    },
    {
      provide: ORDER_NORMALIZER,
      useExisting: OpfGiftCardOrderOccNormalizer,
      multi: true,
    },
  ],
})
export class OpfGiftCardCoreModule {}
