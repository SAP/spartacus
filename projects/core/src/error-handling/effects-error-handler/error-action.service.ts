/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpErrorModel } from '../../model/index';
import { WindowRef } from '../../window';
import { ErrorAction } from './error-action';

/**
 * Service responsible for capturing and handling NgRx error actions that implements `ErrorAction`.
 * It ensures that HTTP errors, which are already handled by `HttpErrorHandlerInterceptor`, are not processed
 * again to avoid duplicate error handling.
 */
@Injectable()
export class ErrorActionService {
  protected errorHandler: ErrorHandler = inject(ErrorHandler);
  protected windowRef = inject(WindowRef);

  handle(action: ErrorAction): void {
    const error: unknown = action.error;

    // Http errors are already handled in HttpErrorHandlerInterceptor.
    // To avoid duplicate errors we want to check if the error is not of type
    // HttpErrorModel or HttpErrorResponse.
    const isNotHttpError =
      !(error instanceof HttpErrorModel) &&
      !(error instanceof HttpErrorResponse);

    if (isNotHttpError && this.shouldHandleError(error)) {
      this.errorHandler.handleError(error);
    }
  }

  /** Here we want to filter which error actions should be handled.
   * By default, we check if action implements interface ErrorAction  */
  isErrorAction(action: Action): action is ErrorAction {
    return 'error' in action;
  }

  /**
   * Determine if the error should be handled by the `ErrorHandler`.
   *
   * Be default, we avoid sending unpredictable errors to the browser's console, to prevent
   * possibly exposing there potentially confidential user's data.
   * This isn't an issue in SSR, where pages are rendered anonymously.
   * Moreover, in SSR we want to capture all app's errors, so we can potentially send
   * a HTTP error response (e.g. 500 error page) from SSR to a client.
   */
  protected shouldHandleError(_error: unknown): boolean {
    return !this.windowRef.isBrowser();
  }
}
