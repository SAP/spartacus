/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
  },
  videoUploadOnPasses: false,
  env: {
    CLIENT_ID: 'mobile_android',
    CLIENT_SECRET: 'secret',
    API_URL:
      'https://api.c432wmya2v-teamspart3-s2-public.model-t.myhybris.cloud',
    BASE_SITE: 'electronics-spa',
    BASE_LANG: 'en',
    BASE_CURRENCY: 'USD',
    OCC_PREFIX: '/occ/v2',
    OCC_PREFIX_USER_ENDPOINT: 'users',
    OCC_PREFIX_ORDER_ENDPOINT: 'orders',
    MAIL_CCV2_URL: 'http://mail-ccv2.westeurope.azurecontainer.io:8025',
    MAIL_CCV2_PREFIX: '/api/v2',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:4200',
  },
});
