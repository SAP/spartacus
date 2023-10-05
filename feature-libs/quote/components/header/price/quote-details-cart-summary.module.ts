/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import { QuoteDetailsCartSummaryComponent } from './quote-details-cart-summary.component';

@NgModule({
  imports: [CommonModule, I18nModule, OutletModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteDetailsCartSummaryComponent: {
          component: QuoteDetailsCartSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteDetailsCartSummaryComponent],
  exports: [QuoteDetailsCartSummaryComponent],
})
export class QuoteDetailsCartSummaryModule {}
