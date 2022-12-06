/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  retries: {
    runMode: 1,
  },
  videoUploadOnPasses: false,
  numTestsKeptInMemory: 1,
  chromeWebSecurity: false,
  video: true,
  videoCompression: 3,
  env: {
    CLIENT_ID: 'mobile_android',
    CLIENT_SECRET: 'secret',
    API_URL: 'https://20.83.184.244:9002',
    //API_URL: 'https://spartacus-devci7674.eastus.cloudapp.azure.com:8443',
    BASE_SITE: 'electronics-spa',
    BASE_LANG: 'en',
    BASE_CURRENCY: 'USD',
    OCC_PREFIX: '/occ/v2',
    OCC_PREFIX_USER_ENDPOINT: 'users',
    OCC_PREFIX_ORDER_ENDPOINT: 'orders',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:4201',
    //baseUrl: 'https://spartacus-devci7674.eastus.cloudapp.azure.com',
  },
});
