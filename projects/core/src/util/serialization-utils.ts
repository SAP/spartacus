import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { isObject } from '../config/utils/deep-merge';
import { ErrorModel, HttpErrorModel } from '../model/misc.model';

export function makeErrorSerializable(
  error: HttpErrorResponse | ErrorModel | any
): HttpErrorModel | Error | any {
  // as ngrx's serialization flags are enabled only in development, we can skip unnecessary computing if running in production
  if (!isDevMode()) {
    return error;
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      type: error.name,
      reason: error.stack,
    } as ErrorModel;
  }

  if (error instanceof HttpErrorResponse) {
    const statusText = error.statusText;
    return {
      message: error.message,
      error: statusText === 'Unknown Error' ? null : error.error,
      status: error.status,
      statusText,
      url: error.url,
    } as HttpErrorModel;
  }

  if (!isObject(error)) {
    return error;
  }

  const serialized = {};
  for (const property of Object.keys(error)) {
    let serializedValue = error[property];
    if (isObject(error[property])) {
      serializedValue = makeErrorSerializable(error[property]);
    }
    serialized[property] = serializedValue;
  }

  return serialized;
}
