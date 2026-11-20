/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const { createHash } = require('node:crypto');

// Match the environment values embedded by the app's resolve-env-plugin.
const environment = Object.entries(process.env)
  .filter(([name]) => name.startsWith('CX_'))
  .sort(([first], [second]) => first.localeCompare(second));

process.stdout.write(
  createHash('sha256').update(JSON.stringify(environment)).digest('hex')
);
