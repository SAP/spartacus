import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorModel } from '../model/misc.model';

export function makeHttpErrorSerializable(
  error: HttpErrorResponse | any
): HttpErrorModel {
  if (!(error instanceof HttpErrorResponse) || !error) {
    return error;
  }

  return {
    message: error.message,
    error: error.error,
    status: error.status,
    statusText: error.statusText,
    url: error.url,
  };
}
