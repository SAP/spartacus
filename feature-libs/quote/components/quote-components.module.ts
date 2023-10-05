/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { QuoteActionsByRoleModule } from './actions/by-role/quote-actions-by-role.module';
import { QuoteActionsConfirmDialogModule } from './actions/confirm-dialog/quote-actions-confirm-dialog.module';
import { QuoteActionsLinkModule } from './actions/link/quote-actions-link.module';
import { QuoteCommentsModule } from './comments/quote-comments.module';
import { defaultQuoteUIConfig } from './config/default-quote-ui.config';
import { QuoteHeaderPriceModule } from './header';
import { QuoteHeaderBuyerEditModule } from './header/buyer-edit/quote-header-buyer-edit.module';
import { QuoteHeaderOverviewModule } from './header/overview/quote-header-overview.module';
import { QuoteHeaderSellerEditModule } from './header/seller-edit/quote-header-seller-edit.module';
import { QuoteItemsModule } from './items/quote-items.module';
import { QuoteListModule } from './list/quote-list.module';
import { QuoteRequestButtonModule } from './request-button/quote-request-button.module';

@NgModule({
  imports: [
    CommonModule,
    ListNavigationModule,
    QuoteActionsByRoleModule,
    QuoteActionsConfirmDialogModule,
    QuoteActionsLinkModule,
    QuoteCommentsModule,
    QuoteHeaderBuyerEditModule,
    QuoteHeaderOverviewModule,
    QuoteHeaderPriceModule,
    QuoteHeaderSellerEditModule,
    QuoteItemsModule,
    QuoteListModule,
    QuoteRequestButtonModule,
  ],
  providers: [provideDefaultConfig(defaultQuoteUIConfig)],
})
export class QuoteComponentsModule {}
