/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PromotionsModule, OutletModule } from '@spartacus/storefront';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';
import { PickUpItemsDetailsModule } from '@spartacus/pickup-in-store/components';
import { OpfCheckoutReviewCardModule } from '../opf-checkout-review-card';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    PromotionsModule,
    OutletModule,
    OpfCheckoutReviewCardModule,
    PickUpItemsDetailsModule,
  ],
  declarations: [OpfCheckoutReviewCartDetailsComponent],
  exports: [OpfCheckoutReviewCartDetailsComponent],
})
export class OpfCheckoutReviewCartDetailsModule {}
