/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AccountSummaryCoreModule } from '@spartacus/organization/account-summary/core';
import { AccountSummaryOccModule } from '@spartacus/organization/account-summary/occ';
import { AccountSummaryComponentsModule } from '@spartacus/organization/account-summary/components';
import { AdministrationModule } from '@spartacus/organization/administration';

@NgModule({
  imports: [
    AccountSummaryCoreModule,
    AccountSummaryOccModule,
    AccountSummaryComponentsModule,
    AdministrationModule,
  ],
})
export class AccountSummaryModule {}
