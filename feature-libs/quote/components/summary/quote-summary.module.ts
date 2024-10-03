/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { QuoteSummaryComponent } from './quote-summary.component';
import { QuoteSummaryPricesModule } from './prices/quote-summary-prices.module';
import { QuoteSummarySellerEditModule } from './seller-edit/quote-summary-seller-edit.module';
import { QuoteSummaryActionsModule } from './actions/quote-summary-actions.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    QuoteSummaryPricesModule,
    QuoteSummarySellerEditModule,
    QuoteSummaryActionsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteSummaryComponent: {
          component: QuoteSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteSummaryComponent],
  exports: [QuoteSummaryComponent],
})
export class QuoteSummaryModule {}
