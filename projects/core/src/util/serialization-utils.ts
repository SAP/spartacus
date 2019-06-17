import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorModel } from '../model/misc.model';

export function makeHttpErrorSerializable(
  error: HttpErrorResponse
): HttpErrorModel | HttpErrorResponse {
  if (!(error instanceof HttpErrorResponse) || !error || !error.headers) {
    return error;
  }

  const headers: { [key: string]: string } = {};
  for (const headerName of error.headers.keys()) {
    const headerValue = error.headers.get(headerName);
    headers[headerName] = headerValue;
  }

  return {
    ...error,
    headers,
  };
}
