/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { OpfGiftCardOrderSummaryComponent } from './opf-gift-card-order-summary.component';

@NgModule({
  imports: [OpfGiftCardOrderSummaryComponent],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrderSummary: {
          component: OpfGiftCardOrderSummaryComponent,
        },
      },
    }),
  ],

  exports: [OpfGiftCardOrderSummaryComponent],
})
export class OpfGiftCardOrderSummaryModule {}
