/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
import baseConfig from './cypress-jdk21.config.ci.ts';

export default defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    API_URL:
      'https://api.cg79x9wuu9-ecdhcomme2-s2-public.model-t.myhybris.cloud',
    CLIENT_ID: 'asm_client',
  },
  e2e: {
    ...baseConfig.e2e,
    baseUrl:
      'https://spartacusstore.cg79x9wuu9-ecdhcomme2-s2-public.model-t.myhybris.cloud',
  },
});
