/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';

const JDK_VERSION: string = 'JDK17';
const CLIENT_ID =
  JDK_VERSION === 'JDK21' ? 'mobile_android_public' : 'mobile_android';

const API_URL =
  JDK_VERSION === 'JDK21'
    ? 'https://api.cg79x9wuu9-eccommerc1-p4-public.model-t.myhybris.cloud'
    : 'https://40.76.109.9:9002';

export default defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  chromeWebSecurity: false,
  video: false,
  retries: {
    runMode: 2,
    openMode: 2,
  },
  videoUploadOnPasses: false,
  env: {
    API_URL,
    BASE_SITE: 'electronics-spa',
    BASE_LANG: 'en',
    BASE_CURRENCY: 'USD',
    CLIENT_ID,
    CLIENT_SECRET: 'secret',
    OCC_PREFIX: '/occ/v2',
    OCC_PREFIX_USER_ENDPOINT: 'users',
    OCC_PREFIX_ORDER_ENDPOINT: 'orders',
    MAIL_CCV2_URL: 'https://mailhog-poc.westeurope.cloudapp.azure.com',
    MAIL_CCV2_PREFIX: '/api/v1',
    JDK_VERSION,
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
