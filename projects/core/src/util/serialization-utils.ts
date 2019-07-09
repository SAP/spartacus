import { HttpErrorResponse } from '@angular/common/http';
import { isObject } from '../config/utils/deep-merge';
import { ErrorModel, HttpErrorModel } from '../model/misc.model';
import { StateEntityLoaderActions, StateLoaderActions } from '../state/index';

export const UNKNOWN_ERROR = {
  error: 'unknown error',
};

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
    return handleHttpErrorResponse(error);
  }

  if (
    error instanceof StateLoaderActions.LoaderFailAction ||
    error instanceof StateEntityLoaderActions.EntityFailAction
  ) {
    let nestedError = error.meta.loader.error;
    if (nestedError instanceof HttpErrorResponse) {
      nestedError = handleHttpErrorResponse(nestedError);
    } else if (isObject(nestedError)) {
      nestedError = UNKNOWN_ERROR;
    }

    return {
      type: error.type,
      entityType: error.meta.entityType,
      id: error.meta['entityId'] ? error.meta['entityId'] : undefined,
      error: nestedError,
    };
  }

  return isObject(error) ? UNKNOWN_ERROR : error;
}

function handleHttpErrorResponse(error: HttpErrorResponse): HttpErrorModel {
  let serializableError = error.error;
  if (isObject(error.error)) {
    serializableError = JSON.stringify(error.error);
  }

  return {
    message: error.message,
    error: serializableError,
    status: error.status,
    statusText: error.statusText,
    url: error.url,
  } as HttpErrorModel;
}
