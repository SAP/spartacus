/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ErrorAction, HttpErrorModel } from '@spartacus/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EffectsErrorHandlerService {
  constructor(protected errorHandler: ErrorHandler) {}

  handleError(action: ErrorAction): void {
    const error = action.error;

    // Http errors are already handled in HttpErrorHandlerInterceptor.
    // To avoid duplicate errors we want to check if the error is not of type
    // HttpErrorModel or HttpErrorResponse.
    const isNotHttpError =
      !(error instanceof HttpErrorModel) &&
      !(error instanceof HttpErrorResponse);

    if (isNotHttpError) {
      this.errorHandler.handleError(error);
    }
  }

  /** Here we want to filter which error actions should be handled.
   * By default, we check if action implements interface ErrorAction  */
  filterActions(action: Action): boolean {
    const isErrorAction = (_action: Action): _action is ErrorAction => {
      return 'error' in _action;
    };
    return !!isErrorAction(action);
  }
}
