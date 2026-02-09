/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { REQUEST, inject } from '@angular/core';
import { REQUEST as LEGACY_REQUEST } from '../../tokens/express.tokens';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';

export const serverLoggerServiceFactory = () => {
  // Check for Angular's REQUEST token first (modern path from AngularNodeAppEngine)
  const angularRequest = inject(REQUEST, { optional: true });

  // Check for legacy Spartacus REQUEST token (from OptimizedSsrEngine)
  const legacyRequest = inject(LEGACY_REQUEST, { optional: true });

  const isExpress = angularRequest !== null || legacyRequest !== null;

  return isExpress
    ? inject(ExpressLoggerService)
    : inject(PrerenderingLoggerService);
};
