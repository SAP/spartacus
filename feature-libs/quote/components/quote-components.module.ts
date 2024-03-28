/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfig, provideDefaultConfig } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { QuoteCommentsModule } from './comments/quote-comments.module';
import { defaultQuoteUIConfig } from './config/default-quote-ui.config';
import { QuoteConfirmDialogModule } from './confirm-dialog/quote-confirm-dialog.module';
import { QuoteHeaderBuyerEditModule } from './header/buyer-edit/quote-header-buyer-edit.module';
import { QuoteHeaderOverviewModule } from './header/overview/quote-header-overview.module';
import { QuoteItemsModule } from './items/quote-items.module';
import { QuoteLinksModule } from './links/quote-links.module';
import { QuoteListModule } from './list/quote-list.module';
import { QuoteSummaryActionsModule } from './summary/actions/quote-summary-actions.module';
import { QuoteSummaryPricesModule } from './summary/prices/quote-summary-prices.module';
import { QuoteSummaryModule } from './summary/quote-summary.module';
import { QuoteSummarySellerEditModule } from './summary/seller-edit/quote-summary-seller-edit.module';

@NgModule({
  imports: [
    CommonModule,
    ListNavigationModule,
    QuoteConfirmDialogModule,
    QuoteLinksModule,
    QuoteCommentsModule,
    QuoteHeaderBuyerEditModule,
    QuoteHeaderOverviewModule,
    QuoteItemsModule,
    QuoteListModule,
    QuoteSummaryModule,
    QuoteSummaryActionsModule,
    QuoteSummaryPricesModule,
    QuoteSummarySellerEditModule,
  ],
  providers: [
    provideDefaultConfig(defaultQuoteUIConfig),
    provideDefaultConfig(<FeaturesConfig>{
      features: {
        storeFrontLibCardParagraphTruncated: false,
      },
    }),
  ],
})
export class QuoteComponentsModule {}
