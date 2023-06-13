/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { LoggerService } from '../logger';
import { HttpErrorModel } from '../model/misc.model';

/**
 * Normalizes HttpErrorResponse to HttpErrorModel.
 *
 * Can be used as a safe and generic way for embodying http errors into
 * NgRx Action payload, as it will strip potentially unserializable parts from
 * it and warn in debug mode if passed error is not instance of HttpErrorModel
 * (which usually happens when logic in NgRx Effect is not sealed correctly)
 */
export function normalizeHttpError(
  error: HttpErrorResponse | HttpErrorModel | any,
  logger?: LoggerService
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
    // CXSPA-3680 - use logger by default
    const logMessage =
      'Error passed to normalizeHttpError is not HttpErrorResponse instance';
    if (logger) {
      logger.error(logMessage, error);
    } else {
      /* eslint-disable-next-line no-console */
      console.error(logMessage, error);
    }
  }

  return undefined;
}
