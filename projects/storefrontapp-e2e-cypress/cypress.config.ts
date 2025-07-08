/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
const mochawesome = require("cypress-mochawesome-reporter/plugin");
const plugins = require('./cypress/plugins/index.js');

export default defineConfig({
  defaultCommandTimeout: 5000,
  requestTimeout: 7000,
  chromeWebSecurity: false,
  retries: {
    runMode: 0,
    openMode: 0
  },
  videoUploadOnPasses: false,
  env: {
    CLIENT_ID: 'mobile_android_public',
    CLIENT_SECRET: 'secret',
    API_URL:
      //'https://api.cg79x9wuu9-ecdhcomme2-s2-public.model-t.myhybris.cloud',
      'https://api.c432wmya2v-teamspart3-s1-public.model-t.myhybris.cloud',
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
      //require('cypress-mochawesome-reporter/plugin')(on);
      // return require('./cypress/plugins/index.js')(on, config);
      mochawesome(on);
      return plugins(on, config);
    },
    baseUrl: 'http://localhost:4200',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Composable Storefront Cypress E2E Test Report',
    embeddedScreenshots: true,   // ✅ Needed for screenshots
    inlineAssets: true,          // ✅ Inline CSS/JS in the report
    saveAllAttempts: false
  },
});
