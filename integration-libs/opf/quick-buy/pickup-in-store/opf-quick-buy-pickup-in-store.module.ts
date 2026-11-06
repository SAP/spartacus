/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfQuickBuyModule } from '@spartacus/opf/quick-buy';
import { OpfQuickBuySingleProductCartOptionsFacade } from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyPickupInStoreSingleProductService } from './opf-quick-buy-pickup-in-store-single-product.service';

@NgModule({
  imports: [OpfQuickBuyModule],
  providers: [
    OpfQuickBuyPickupInStoreSingleProductService,
    {
      provide: OpfQuickBuySingleProductCartOptionsFacade,
      useExisting: OpfQuickBuyPickupInStoreSingleProductService,
    },
  ],
})
export class OpfQuickBuyPickupInStoreModule {}
