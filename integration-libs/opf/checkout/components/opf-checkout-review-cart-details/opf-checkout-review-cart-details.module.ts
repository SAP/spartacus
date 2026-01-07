/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PickUpItemsDetailsModule } from '@spartacus/pickup-in-store/components';
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
    OpfCheckoutReviewCartDetailsComponent,
    OpfCheckoutReviewCardModule,
    PickUpItemsDetailsModule,
  ],
  exports: [OpfCheckoutReviewCartDetailsComponent],
})
export class OpfCheckoutReviewCartDetailsModule {}
