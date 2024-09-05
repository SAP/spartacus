/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { QuoteCommentsModule } from './comments/quote-comments.module';
import { defaultQuoteUIConfig } from './config/default-quote-ui.config';
import { QuoteConfirmDialogModule } from './confirm-dialog/quote-confirm-dialog.module';

import { QuoteHeaderOverviewModule } from './header/overview/quote-header-overview.module';
import { QuoteItemsModule } from './items/quote-items.module';
import { QuoteLinksModule } from './links/quote-links.module';
import { QuoteListModule } from './list/quote-list.module';


import { QuoteSummaryModule } from './summary/quote-summary.module';


@NgModule({
  imports: [
    CommonModule,
    ListNavigationModule,
    QuoteConfirmDialogModule,
    QuoteLinksModule,
    QuoteCommentsModule,
    QuoteHeaderOverviewModule,
    QuoteItemsModule,
    QuoteListModule,
    QuoteSummaryModule,
],
  providers: [provideDefaultConfig(defaultQuoteUIConfig)],
})
export class QuoteComponentsModule {}
