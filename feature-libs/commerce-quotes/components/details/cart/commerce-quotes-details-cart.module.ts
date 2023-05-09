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
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { CommerceQuotesDetailsCartComponent } from './commerce-quotes-details-cart.component';
import { CommerceQuotesDetailsCartSummaryComponent } from './summary/commerce-quote-details-cart-summary.component';
import { CommerceQuotesTableComponentModule } from '../../presentational/commerce-quotes-table/commerce-quotes-table.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OutletModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    CommerceQuotesTableComponentModule,
    MediaModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesCartComponent: {
          component: CommerceQuotesDetailsCartComponent,
          guards: [AuthGuard],
        },
        CommerceQuotesCartSummaryComponent: {
          component: CommerceQuotesDetailsCartSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CommerceQuotesDetailsCartComponent,
    CommerceQuotesDetailsCartSummaryComponent,
  ],
  exports: [
    CommerceQuotesDetailsCartComponent,
    CommerceQuotesDetailsCartSummaryComponent,
  ],
})
export class CommerceQuotesDetailsCartModule {}
