/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { UserRegistrationFacade } from '@spartacus/organization/user-registration/root';
import { UserRegistrationService } from './user-registration.service';

export const facadeProviders: Provider[] = [
  UserRegistrationService,
  {
    provide: UserRegistrationFacade,
    useExisting: UserRegistrationService,
  },
];
