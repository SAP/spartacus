import { HttpErrorResponse } from '@angular/common/http';
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
    const statusText = error.statusText;
    return {
      message: error.message,
      error: statusText === 'Unknown Error' ? null : error.error,
      status: error.status,
      statusText,
      url: error.url,
    } as HttpErrorModel;
  }

  return error;
}
