/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { CommerceQuotesActionLinksModule } from './commerce-quotes-action-links/commerce-quotes-action-links.module';
import { CommerceQuotesActionsByRoleModule } from './commerce-quotes-actions-by-role/commerce-quotes-actions-by-role.module';
import { CommerceQuotesListModule } from './commerce-quotes-list/commerce-quotes-list.module';
import { CommerceQuotesRequestQuoteButtonModule } from './commerce-quotes-request-quote-button/commerce-quotes-request-quote-button.module';
import { CommerceQuotesRequestQuoteDialogModule } from './commerce-quotes-request-quote-dialog/commerce-quotes-request-quote-dialog.module';
import { CommerceQuotesDetailsOverviewModule } from './details/overview/commerce-quotes-details-overview.module';

@NgModule({
  imports: [
    CommonModule,
    CommerceQuotesListModule,
    CommerceQuotesDetailsOverviewModule,
    CommerceQuotesRequestQuoteButtonModule,
    CommerceQuotesRequestQuoteDialogModule,
    CommerceQuotesActionLinksModule,
    CommerceQuotesActionsByRoleModule,
    ListNavigationModule,
  ],
})
export class CommerceQuotesComponentsModule {}
