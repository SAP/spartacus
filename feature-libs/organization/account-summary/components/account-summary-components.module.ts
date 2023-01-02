/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AccountSummaryDocumentModule } from './details/document/account-summary-document.module';
import { AccountSummaryHeaderModule } from './details/header/account-summary-header.module';
import { AccountSummaryListModule } from './list/account-summary-list.module';

@NgModule({
  imports: [
    AccountSummaryListModule,
    AccountSummaryHeaderModule,
    AccountSummaryDocumentModule,
  ],
})
export class AccountSummaryComponentsModule {}
