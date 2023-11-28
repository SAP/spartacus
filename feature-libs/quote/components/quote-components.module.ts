/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { defaultQuoteUIConfig } from './config/default-quote-ui.config';
import { provideDefaultConfig } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { QuoteActionsConfirmDialogModule } from './actions/confirm-dialog/quote-actions-confirm-dialog.module';
import { QuoteActionsLinkModule } from './actions/link/quote-actions-link.module';
import { QuoteCommentsModule } from './comments/quote-comments.module';
import { QuoteHeaderBuyerEditModule } from './header/buyer-edit/quote-header-buyer-edit.module';
import { QuoteHeaderOverviewModule } from './header/overview/quote-header-overview.module';
import { QuoteItemsModule } from './items/quote-items.module';
import { QuoteListModule } from './list/quote-list.module';
import { QuoteSummaryModule } from './summary/quote-summary.module';
import { QuoteSummaryActionsModule } from './summary/actions/quote-summary-actions.module';
import { QuoteSummaryPriceModule } from './summary/price/quote-summary-price.module';
import { QuoteSummarySellerEditModule } from './summary/seller-edit/quote-summary-seller-edit.module';

@NgModule({
  imports: [
    CommonModule,
    ListNavigationModule,
    QuoteActionsConfirmDialogModule,
    QuoteActionsLinkModule,
    QuoteCommentsModule,
    QuoteHeaderBuyerEditModule,
    QuoteHeaderOverviewModule,
    QuoteItemsModule,
    QuoteListModule,
    QuoteSummaryModule,
    QuoteSummaryActionsModule,
    QuoteSummaryPriceModule,
    QuoteSummarySellerEditModule,
  ],
  providers: [provideDefaultConfig(defaultQuoteUIConfig)],
})
export class QuoteComponentsModule {}
