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
import { defaultQuoteUIConfig } from './config/default-quote-ui.config';
import { QuoteSellerEditModule } from './header/seller-edit/quote-seller-edit.module';
import { QuoteListModule } from './list/quote-list.module';
import { QuoteRequestButtonModule } from './request-button/quote-request-button.module';
import { QuoteHeaderBuyerEditModule } from './header/buyer-edit/quote-header-buyer-edit.module';
import { QuoteHeaderOverviewModule } from './header/overview/quote-header-overview.module';
import { QuoteCommentsModule } from './comments/quote-comments.module';
import { QuoteDetailsCartModule } from './items/quote-details-cart.module';
import { QuoteDetailsCartSummaryModule } from './header';

@NgModule({
  imports: [
    CommonModule,
    QuoteListModule,
    QuoteHeaderBuyerEditModule,
    QuoteHeaderOverviewModule,
    QuoteDetailsCartModule,
    QuoteRequestButtonModule,
    QuoteActionsLinkModule,
    QuoteActionsByRoleModule,
    QuoteCommentsModule,
    QuoteSellerEditModule,
    ListNavigationModule,
    QuoteActionsConfirmDialogModule,
    QuoteDetailsCartSummaryModule,
  ],
  providers: [provideDefaultConfig(defaultQuoteUIConfig)],
})
export class QuoteComponentsModule {}
