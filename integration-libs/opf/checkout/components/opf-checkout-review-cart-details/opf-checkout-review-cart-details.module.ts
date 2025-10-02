/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PromotionsModule, OutletModule } from '@spartacus/storefront';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        UrlModule,
        PromotionsModule,
        OutletModule,
        OpfCheckoutReviewCartDetailsComponent,
    ],
    exports: [OpfCheckoutReviewCartDetailsComponent],
})
export class OpfCheckoutReviewCartDetailsModule {}
