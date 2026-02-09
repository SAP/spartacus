/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { REQUEST, inject } from '@angular/core';
import { REQUEST as LEGACY_REQUEST } from '../../tokens/express.tokens';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';

/**
 * Factory that selects the appropriate logger service based on the runtime context.
 *
 * Returns ExpressLoggerService when running in Express (SSR with either modern
 * CxAngularNodeAppEngine or legacy OptimizedSsrEngine), detected by the presence
 * of a REQUEST token. Returns PrerenderingLoggerService for prerendering contexts.
 */
export const serverLoggerServiceFactory = () => {
  // Check for either Angular's or Spartacus's REQUEST token to detect Express context
  const hasRequest =
    inject(REQUEST, { optional: true }) !== null ||
    inject(LEGACY_REQUEST, { optional: true }) !== null;

  return hasRequest
    ? inject(ExpressLoggerService)
    : inject(PrerenderingLoggerService);
};
