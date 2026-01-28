/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { OutletModule, PromotionsModule } from '@spartacus/storefront';
import { OpfCheckoutReviewCardModule } from '../opf-checkout-review-card';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    PromotionsModule,
    OutletModule,
    OpfCheckoutReviewCardModule,
    OpfCheckoutReviewCartDetailsComponent,
  ],
})
export class OpfCheckoutReviewCartDetailsModule {}
