/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.ci.ts';

export default defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    CLIENT_ID:
      baseConfig?.env?.JDK_VERSION === 'JDK21'
        ? 'mobile_android_public_b2b'
        : 'mobile_android',
  },
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://localhost:5200',
  },
});
