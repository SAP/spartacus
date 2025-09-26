/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  projectId: 'k3nmep',
  numTestsKeptInMemory: 100,
  chromeWebSecurity: false,
  video: true,
  retries: {
    runMode: 2,
  },
  videoUploadOnPasses: false,
  env: {
    API_URL:
      'https://api.c432wmya2v-teamspart3-s4-public.model-t.myhybris.cloud',
    BASE_SITE: 'electronics-spa',
    BASE_LANG: 'en',
    BASE_CURRENCY: 'USD',
    CLIENT_ID: 'mobile_android_public',
    CLIENT_SECRET: 'secret',
    OCC_PREFIX: '/occ/v2',
    OCC_PREFIX_USER_ENDPOINT: 'users',
    OCC_PREFIX_ORDER_ENDPOINT: 'orders',
    MAIL_CCV2_URL: 'https://mailhog-poc.westeurope.cloudapp.azure.com',
    MAIL_CCV2_PREFIX: '/api/v1',
    JDK_VERSION: 'JDK21',
  },
  e2e: {
    setupNodeEvents(on, config) {
      if (config.env.BASE_SITE === 'powertools-spa') {
        config.baseUrl = 'http://localhost:5200';
        config.env.CLIENT_ID = 'mobile_android_public_b2b';
      } else {
        config.baseUrl = 'http://localhost:4200';
        config.env.CLIENT_ID = 'mobile_android_public';
      }
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
