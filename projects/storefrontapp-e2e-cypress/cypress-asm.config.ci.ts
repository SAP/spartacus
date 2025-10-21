/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
    CLIENT_ID: 'asm_client',
    API_URL: 'https://spartacus-devci7677.eastus.cloudapp.azure.com:8443',
    JDK_VERSION: 'JDK21',
  },
});
