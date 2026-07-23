/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import type { ExpressServerLogger } from '../logger/loggers/express-server-logger';
import { getRequestOrigin } from './express-request-origin';

export function getRequestUrl(
  req: Request,
  allowedOrigins?: string[],
  logger?: ExpressServerLogger
): string {
  return getRequestOrigin(req, allowedOrigins, logger) + req.originalUrl;
}
