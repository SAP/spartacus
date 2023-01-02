/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserAccountService } from './user-account.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Provider } from '@angular/core';

export const facadeProviders: Provider[] = [
  UserAccountService,
  {
    provide: UserAccountFacade,
    useExisting: UserAccountService,
  },
];
