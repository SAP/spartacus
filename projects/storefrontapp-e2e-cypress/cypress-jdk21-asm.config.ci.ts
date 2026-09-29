/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.ci.ts';

export default defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    CLIENT_ID: 'asm_client',
    API_URL: 'https://spartacus-colosseum1.eastus.cloudapp.azure.com:8443',
    JDK_VERSION: 'JDK21',
  },
});
