/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';
import { I18nModule, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { CardModule, IconModule, OutletModule, PromotionsModule } from '@spartacus/storefront';



@NgModule({
  declarations: [
    CheckoutReviewShippingComponent
  ],
  exports: [CheckoutReviewShippingComponent],
  imports: [
    CommonModule,
    I18nModule,
    CardModule,
    UrlModule,
    RouterModule,
    PromotionsModule,
    IconModule,
    OutletModule,
  ]
})
export class CheckoutReviewShippingModule { }
