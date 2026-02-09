/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { GiftCardOrderSummaryComponent } from './gift-card-order-summary.component';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        GiftCardOrderSummaryComponent: {
          component: GiftCardOrderSummaryComponent,
        },
      },
    }),
  ],
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    I18nModule,
    ReactiveFormsModule,
    GiftCardOrderSummaryComponent,
  ],
  exports: [GiftCardOrderSummaryComponent],
})
export class GiftCardOrderSummaryModule {}
