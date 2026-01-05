/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { LoggerService } from '../logger';
import { HttpErrorModel } from '../model';

/**
 * Safely normalizes HttpErrorResponse to HttpErrorModel or returns the original error.
 *
 * Can be used as a safe and generic way for embodying http errors into
 * NgRx Action payload, as it will strip potentially unserializable parts from
 * HttpErrorResponse instances and warn in debug mode if passed error is not
 * instance of HttpErrorModel or HttpErrorResponse (which usually happens when
 * logic in NgRx Effect is not sealed correctly)
 */
export function tryNormalizeHttpError(
  error: HttpErrorResponse | HttpErrorModel | any,
  logger: LoggerService
): HttpErrorModel | Error {
  return normalizeHttpError(error, logger) ?? error;
}

// CXSPA-11104: Revise type to avoid redundant types - typescript:S6571
function normalizeHttpError(
  error: HttpErrorResponse | HttpErrorModel | any,
  logger: LoggerService
): HttpErrorModel | undefined {
  if (error instanceof HttpErrorModel) {
    return error;
  }

  if (error instanceof HttpErrorResponse) {
    const normalizedError = new HttpErrorModel();
    normalizedError.message = error.message;
    normalizedError.status = error.status;
    normalizedError.statusText = error.statusText;
    normalizedError.url = error.url;

    // include backend's error details
    if (Array.isArray(error.error.errors)) {
      normalizedError.details = error.error.errors;
    } else if (typeof error.error.error === 'string') {
      normalizedError.details = [
        {
          type: error.error.error,
          message: error.error.error_description,
        },
      ];
    }

    return normalizedError;
  }

  if (isDevMode()) {
    const logMessage =
      'Error passed to tryNormalizeHttpError is not HttpErrorResponse instance';
    logger.error(logMessage, error);
  }

  return undefined;
}
