/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.ts';

export default defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
  },
  e2e: {
    ...baseConfig.e2e,
  },
});
