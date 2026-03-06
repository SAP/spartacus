/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideConfig } from '@spartacus/core';
import { OrderConfirmationGuard } from '@spartacus/order/components';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfGiftCardOrderConfirmationTotalsComponent } from './opf-gift-card-order-confirmation-totals/opf-gift-card-order-confirmation-totals.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    I18nModule,
    ReactiveFormsModule,
    OpfGiftCardOrderConfirmationTotalsComponent,
  ],

  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationTotalsComponent: {
          component: OpfGiftCardOrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],

  exports: [OpfGiftCardOrderConfirmationTotalsComponent],
})
export class OpfGiftCardOrderConfirmationModule {}
