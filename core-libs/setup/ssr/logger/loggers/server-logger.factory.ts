/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { PrerenderingServerLogger } from './prerendering-server-logger';
import { SERVER_LOGGER } from './server-logger';

/**
 * Returns a `ServerLogger` instance
 *
 * If any specific `ServerLogger` implementation has been already provided
 * on the platform injector level (e.g. in ExpressJS app), we use it.
 * Otherwise we fallback to the `PrerenderigServerLogger`.
 */
export const serverLoggerFactory = () => {
  const originalServerLogger = inject(SERVER_LOGGER, {
    skipSelf: true,
    optional: true,
  });
  return originalServerLogger || new PrerenderingServerLogger();
};
