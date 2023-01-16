/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { I18nextInitializer } from './i18next-initializer';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: () => () => inject(I18nextInitializer).initialize(),
    multi: true,
  },
];
