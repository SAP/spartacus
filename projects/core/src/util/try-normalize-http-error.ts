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
