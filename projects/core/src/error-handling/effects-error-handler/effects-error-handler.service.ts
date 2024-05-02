/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Action } from '@ngrx/store';
import {
  ErrorAction,
  ErrorActionType,
  HttpErrorModel,
} from '../../model/index';

@Injectable()
export class EffectsErrorHandlerService {
  protected errorHandler = inject(ErrorHandler);

  handleError(action: ErrorAction): void {
    const error: ErrorActionType = action.error;

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
  filterActions(action: Action): action is ErrorAction {
    return 'error' in action;
  }
}
