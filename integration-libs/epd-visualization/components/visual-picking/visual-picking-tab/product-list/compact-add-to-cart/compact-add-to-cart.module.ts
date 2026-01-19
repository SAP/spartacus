/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CompactAddToCartComponent } from './compact-add-to-cart.component';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerModule,
    PromotionsModule,
    I18nModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    CompactAddToCartComponent,
  ],
  exports: [CompactAddToCartComponent],
})
export class CompactAddToCartModule {}
