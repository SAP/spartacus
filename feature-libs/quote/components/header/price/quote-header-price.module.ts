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
import { QuoteHeaderPriceComponent } from './quote-header-price.component';

@NgModule({
  imports: [CommonModule, I18nModule, OutletModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteDetailsCartSummaryComponent: {
          component: QuoteHeaderPriceComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteHeaderPriceComponent],
  exports: [QuoteHeaderPriceComponent],
})
export class QuoteHeaderPriceModule {}
