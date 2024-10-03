/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';
import { AccountSummaryConnector } from './connectors/account-summary.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    ...facadeProviders,
    AccountSummaryConnector,
    {
      provide: PageMetaResolver,
      useExisting: AccountSummaryPageMetaResolver,
      multi: true,
    },
  ],
})
export class AccountSummaryCoreModule {}
