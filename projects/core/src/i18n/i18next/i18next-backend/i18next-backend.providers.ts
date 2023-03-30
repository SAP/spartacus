/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import { I18nextHttpBackendInitializer } from './i18next-http-backend.initializer';
import { I18nextResourcesToBackendInitializer } from './i18next-resources-to-backend.initializer';

export const i18nextBackendProviders: Provider[] = [
  {
    provide: I18nextBackendInitializer,
    useExisting: I18nextHttpBackendInitializer,
    multi: true,
  },
  {
    provide: I18nextBackendInitializer,
    useExisting: I18nextResourcesToBackendInitializer,
    multi: true,
  },
];
