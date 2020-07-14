import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorModel } from '../model/misc.model';
import { isDevMode } from '@angular/core';

/**
 * Normalizes HttpErrorResponse to HttpErrorModel.
 *
 * Can be used as a safe and generic way for embodying errors into
 * NgRx Action payload, as it will strip potentially unserializable parts from
 * the model and warn in debug mode if passed error is not instance of
 * HttpErrorModel (which could be caused by invalid logic in Effects)
 */
export function normalizeHttpError(
  error: HttpErrorResponse | any
): HttpErrorModel | undefined {
  if (error instanceof HttpErrorResponse) {
    const normalizedError: HttpErrorModel = {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    };

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
    console.error(
      'Error passed to nomalizeHttpError is not HttpErrorResponse instance',
      error
    );
  }

  return undefined;
}
