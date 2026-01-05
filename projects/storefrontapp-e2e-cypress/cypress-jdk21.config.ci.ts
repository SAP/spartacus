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
    CLIENT_ID: 'mobile_android_public',
    API_URL:
      'https://api.c432wmya2v-teamspart3-s4-public.model-t.myhybris.cloud',
    JDK_VERSION: 'JDK21',
  },
});
