/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { getRequestOrigin } from './express-request-origin';

/**
 * @deprecated i don't know
 */
export function getRequestUrl(req: Request): string {
  return getRequestOrigin(req) + req.originalUrl;
}
