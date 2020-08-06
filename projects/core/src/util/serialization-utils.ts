import { HttpErrorResponse } from '@angular/common/http';
import { isObject } from '../config/utils/deep-merge';
import { ErrorModel, HttpErrorModel } from '../model/misc.model';

/**
 * @deprecated since 2.1, use normalizeHttpError instead
 */
export const UNKNOWN_ERROR = {
  error: 'unknown error',
};

const circularReplacer = () => {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 * @deprecated since 2.1, use normalizeHttpError instead
 */
export function makeErrorSerializable(
  error: HttpErrorResponse | ErrorModel | any
): HttpErrorModel | Error | any {
  if (error instanceof Error) {
    return {
      message: error.message,
      type: error.name,
      reason: error.stack,
    } as ErrorModel;
  }

  if (error instanceof HttpErrorResponse) {
    let serializableError = error.error;
    if (isObject(error.error)) {
      serializableError = JSON.stringify(error.error, circularReplacer());
    }

    return {
      message: error.message,
      error: serializableError,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    } as HttpErrorModel;
  }

  return isObject(error) ? UNKNOWN_ERROR : error;
}
