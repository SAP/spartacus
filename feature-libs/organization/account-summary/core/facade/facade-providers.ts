/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { AccountSummaryService } from './account-summary.service';

export const facadeProviders: Provider[] = [
  AccountSummaryService,
  {
    provide: AccountSummaryFacade,
    useExisting: AccountSummaryService,
  },
];
