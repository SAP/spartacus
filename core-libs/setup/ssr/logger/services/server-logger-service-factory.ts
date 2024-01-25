/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';

export const serverLoggerServiceFactory = () => {
  const isExpress = inject(REQUEST, { optional: true }) !== null;
  return isExpress
    ? inject(ExpressLoggerService)
    : inject(PrerenderingLoggerService);
};
