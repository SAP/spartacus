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
import { QuoteHeaderOrderSummaryComponent } from './quote-header-order-summary.component';
import { QuoteHeaderPriceModule } from '../price/quote-header-price.module';
import { QuoteHeaderSellerEditModule } from '../seller-edit/quote-header-seller-edit.module';
import { QuoteActionsByRoleModule } from '../../actions/by-role/quote-actions-by-role.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    QuoteHeaderPriceModule,
    QuoteHeaderSellerEditModule,
    QuoteActionsByRoleModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteHeaderOrderSummaryComponent: {
          component: QuoteHeaderOrderSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteHeaderOrderSummaryComponent],
  exports: [QuoteHeaderOrderSummaryComponent],
})
export class QuoteHeaderOrderSummaryModule {}
