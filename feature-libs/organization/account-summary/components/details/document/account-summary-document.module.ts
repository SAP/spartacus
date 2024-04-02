/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { AdminGuard } from '@spartacus/organization/administration/core';
import {
  IconModule,
  PaginationModule,
  SortingModule,
} from '@spartacus/storefront';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { AccountSummaryDocumentFilterModule } from './filter';

export const accountSummaryDocumentCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountSummaryDocumentComponent: {
      component: AccountSummaryDocumentComponent,
      guards: [AuthGuard, AdminGuard],
    },
  },
};

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    AccountSummaryDocumentFilterModule,
    CommonModule,
    I18nModule,
    SortingModule,
    PaginationModule,
    IconModule,
  ],
  providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
})
export class AccountSummaryDocumentModule {}
