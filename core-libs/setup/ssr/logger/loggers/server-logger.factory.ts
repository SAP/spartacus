/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { PrerenderingServerLogger } from './prerendering-server-logger';
import { SERVER_LOGGER } from './server-logger';

/**
 * Factory provides logger that's used for pre-rendering purposes.
 */
export const serverLoggerFactory = () => {
  const originalSsrLogger = inject(SERVER_LOGGER, {
    skipSelf: true,
    optional: true,
  });
  return originalSsrLogger || new PrerenderingServerLogger();
};
