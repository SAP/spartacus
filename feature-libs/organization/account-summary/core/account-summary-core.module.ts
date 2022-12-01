/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler, PageMetaResolver } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';
import { AccountSummaryConnector } from './connectors/account-summary.connector';
import { facadeProviders } from './facade/facade-providers';
import { BlobErrorHandler } from './http-interceptors/blob-error.handler';

@NgModule({
  providers: [
    ...facadeProviders,
    AccountSummaryConnector,
    {
      provide: PageMetaResolver,
      useExisting: AccountSummaryPageMetaResolver,
      multi: true,
    },
    {
      provide: HttpErrorHandler,
      useExisting: BlobErrorHandler,
      multi: true,
    },
  ],
})
export class AccountSummaryCoreModule {}
