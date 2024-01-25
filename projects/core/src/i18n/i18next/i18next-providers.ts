/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { i18nextBackendProviders } from './i18next-backend/i18next-backend.providers';
import { I18nextInitializer } from './i18next-initializer';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: () => {
      const configInitializerService = inject(ConfigInitializerService);
      const i18nextInitializer = inject(I18nextInitializer);
      return () =>
        configInitializerService
          .getStable('i18n')
          .toPromise()
          .then(() => i18nextInitializer.initialize());
    },
    multi: true,
  },

  ...i18nextBackendProviders,
];
