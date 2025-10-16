/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.ts';

export default defineConfig({
  ...baseConfig,
  // video: true,
  // videoCompression: 32,
  // screenshotOnRunFailure: true,
  env: {
    ...baseConfig.env,
    CLIENT_ID: 'mobile_android_public',
    // API_URL: 'https://localhost:9002',
    API_URL: 'https://api.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud',
    JDK_VERSION: 'JDK21',
  },
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://spartacusstore.cg79x9wuu9-eccommerc1-d3-public.model-t.myhybris.cloud',
  },
});
