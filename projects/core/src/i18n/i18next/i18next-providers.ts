/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { I18nextBackendService } from './i18next-backend/i18next-backend.service';
import { I18nextHttpBackendService } from './i18next-backend/i18next-http-backend.service';
import { I18nextInitializer } from './i18next-initializer';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: () => () => inject(I18nextInitializer).initialize(),
    multi: true,
  },
  {
    provide: I18nextBackendService,
    useExisting: I18nextHttpBackendService,
  },
];
