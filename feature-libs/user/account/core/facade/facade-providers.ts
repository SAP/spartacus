/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  UserAccountFacade,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { UserAccountService } from './user-account.service';
import { VerificationTokenService } from './verification-token.service';

export const facadeProviders: Provider[] = [
  UserAccountService,
  {
    provide: UserAccountFacade,
    useExisting: UserAccountService,
  },
  VerificationTokenService,
  {
    provide: VerificationTokenFacade,
    useExisting: VerificationTokenService,
  },
];
