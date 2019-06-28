import { HttpErrorResponse } from '@angular/common/http';
import { isObject } from '../config/utils/deep-merge';
import { ErrorModel, HttpErrorModel } from '../model/misc.model';

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
    return {
      message: error.message,
      error: error.error,
      status: error.status,
      statusText: error.statusText,
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
