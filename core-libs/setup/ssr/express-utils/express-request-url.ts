/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { getRequestOrigin } from './express-request-origin';

export function getRequestUrl(req: Request): string {
  return getRequestOrigin(req) + req.originalUrl;
}
