/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpErrorModel,
  LoggerService,
  normalizeHttpError,
} from '@spartacus/core';

export function tryNormalizeHttpError(
  error: HttpErrorResponse | HttpErrorModel | any,
  logger?: LoggerService
): HttpErrorModel | Error {
  return normalizeHttpError(error, logger) ?? error;
}
