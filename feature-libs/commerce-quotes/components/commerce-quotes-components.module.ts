/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { QuoteActionLinksModule } from './quote-action-links/quote-action-links.module';
import { CommerceQuotesActionsByRoleModule } from './quote-actions-by-role/commerce-quotes-actions-by-role.module';
import { CommerceQuotesListModule } from './quote-list/commerce-quotes-list.module';
import { CommerceQuotesRequestQuoteButtonModule } from './quote-request-quote-button/commerce-quotes-request-quote-button.module';
import { CommerceQuotesRequestQuoteDialogModule } from './quote-request-quote-dialog/commerce-quotes-request-quote-dialog.module';
import {
  QuoteDetailsCartModule,
  QuoteDetailsOverviewModule,
  QuoteDetailsVendorContactModule,
} from './details';

@NgModule({
  imports: [
    CommonModule,
    CommerceQuotesListModule,
    QuoteDetailsOverviewModule,
    QuoteDetailsCartModule,
    CommerceQuotesRequestQuoteButtonModule,
    CommerceQuotesRequestQuoteDialogModule,
    QuoteActionLinksModule,
    CommerceQuotesActionsByRoleModule,
    QuoteDetailsVendorContactModule,
    ListNavigationModule,
  ],
})
export class CommerceQuotesComponentsModule {}
