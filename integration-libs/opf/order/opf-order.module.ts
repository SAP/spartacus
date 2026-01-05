/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OpfOccOrderNormalizer } from './opf-occ-order-normalizer';

@NgModule({
  providers: [
    {
      provide: ORDER_NORMALIZER,
      useExisting: OpfOccOrderNormalizer,
      multi: true,
    },
  ],
})
export class OpfOrderModule {}
