/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { makeEnvironmentProviders } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { baseSite } from './base-site.config';

export const spartacusB2cConfigurationProviders = makeEnvironmentProviders([
  provideConfig({
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      baseSite: baseSite,
    },
  }),
  provideConfig({
    cart: {
      validation: { enabled: true },
      selectiveCart: {
        enabled: true,
      },
    },
  }),
]);
