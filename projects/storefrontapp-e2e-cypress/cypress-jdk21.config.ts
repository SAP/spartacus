/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.ts';

export default defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    CLIENT_ID: 'mobile_android_public',
    API_URL:
      'https://spartacus-colosseum1.eastus.cloudapp.azure.com:8443',
    JDK_VERSION: 'JDK21',
  },
});
