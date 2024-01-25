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
import { CardModule } from '@spartacus/storefront';
import { AccountSummaryHeaderComponent } from './account-summary-header.component';

export const accountSummaryHeaderCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountSummaryHeaderComponent: {
      component: AccountSummaryHeaderComponent,
      guards: [AuthGuard, AdminGuard],
    },
  },
};

@NgModule({
  declarations: [AccountSummaryHeaderComponent],
  imports: [CardModule, CommonModule, I18nModule],
  providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)],
})
export class AccountSummaryHeaderModule {}
