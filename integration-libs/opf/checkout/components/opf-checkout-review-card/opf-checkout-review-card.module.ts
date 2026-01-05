/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CardModule, IconModule } from '@spartacus/storefront';
import { OpfCheckoutReviewCardComponent } from './opf-checkout-review-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    CardModule,
    IconModule,
    UrlModule,
  ],
  declarations: [OpfCheckoutReviewCardComponent],
  exports: [OpfCheckoutReviewCardComponent],
})
export class OpfCheckoutReviewCardModule {}
