/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GiftCardOrderSummaryComponent,
  GiftCardOrderSummaryModule,
} from './gift-card-order-summary';

import { AppliedGiftCardModule } from './applied-gift-card/applied-gift-card.module';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { GiftCardModule } from './gift-card/gift-card.module';
import { NgModule } from '@angular/core';
import { provideOutlet } from '@spartacus/storefront';

@NgModule({
  imports: [GiftCardModule, AppliedGiftCardModule, GiftCardOrderSummaryModule],
  providers: [
    provideOutlet({
      id: 'cx-opf-checkout-gift-card',
      component: GiftCardComponent,
    }),
    provideOutlet({
      id: 'cx-gift-card-order-summary',
      component: GiftCardOrderSummaryComponent,
    }),
  ],
})
export class OpfGiftCardComponentModule {}
