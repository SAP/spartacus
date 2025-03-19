/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from '../logger';
import { HttpErrorModel } from '../model';
import { normalizeHttpError } from './normalize-http-error';

export function tryNormalizeHttpError(
  error: HttpErrorResponse | HttpErrorModel | any,
  logger: LoggerService
): HttpErrorModel | Error {
  return normalizeHttpError(error, logger) ?? error;
}
