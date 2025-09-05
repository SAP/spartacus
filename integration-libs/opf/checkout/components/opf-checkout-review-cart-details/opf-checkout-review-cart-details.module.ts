/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { I18nModule, UrlModule } from '@spartacus/core';
import { OutletModule, PromotionsModule } from '@spartacus/storefront';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpfCheckoutReviewCardModule } from '../opf-checkout-review-card';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    PromotionsModule,
    OutletModule,
    OpfCheckoutReviewCardModule
  ],
  declarations: [OpfCheckoutReviewCartDetailsComponent],
  exports: [OpfCheckoutReviewCartDetailsComponent],
})
export class OpfCheckoutReviewCartDetailsModule {}
