/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { makeEnvironmentProviders } from '@angular/core';
import { defaultB2BCheckoutConfig } from '@spartacus/checkout/b2b/root';
import { provideConfig } from '@spartacus/core';
import { defaultB2bOccConfig } from '@spartacus/setup';
import { baseSite } from './base-site.config';

export const spartacusB2bConfigurationProviders = makeEnvironmentProviders([
  provideConfig(defaultB2bOccConfig),
  provideConfig(defaultB2BCheckoutConfig),
  provideConfig({
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      baseSite,
    },
  }),
]);
