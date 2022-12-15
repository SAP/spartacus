/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { I18nextInitializer } from './i18next-initializer';

// SPIKE TODO: move directly to I18nModule
export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: () => () => inject(I18nextInitializer).initialize(),
    multi: true,
  },

  // SPIKE TODO: remove the old APP_INITIALIZER and old i18nextInit

  // {
  //   provide: APP_INITIALIZER,
  //   useFactory: i18nextInit,
  //   deps: [
  //     I18NEXT_INSTANCE,
  //     ConfigInitializerService,
  //     LanguageService,
  //     HttpClient,
  //     [new Optional(), SERVER_REQUEST_ORIGIN],
  //     SiteContextI18nextSynchronizer,
  //   ],
  //   multi: true,
  // },
];
