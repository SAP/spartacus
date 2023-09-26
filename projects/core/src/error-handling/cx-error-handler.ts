/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggerService } from '../logger';
import { ErrorInterceptorService } from './error-interceptors/error-interceptor.service';

/**
 * The CxErrorHandler is the default ErrorHandler for Spartacus.
 * It is responsible for handling errors and passing them to the registered error interceptors.
 *
 * @method handleError - Handles the error by passing it to the registered error interceptors.
 *
 * @public
 */
@Injectable()
export class CxErrorHandler implements ErrorHandler {
  //TODO: Keep it updated with the latest version of Spartacus
  /**
   * @deprecated Since 6.6 - `LoggerService` is unused here. Instead it's now used in `LoggerErrorInterceptor`
   */
  protected logger = inject(LoggerService);
  protected errorInterceptorService = inject(ErrorInterceptorService);

  /**
   * Error handler method. Handles the error by passing it to the registered error interceptors.
   * @param error - The error to be handled.
   */
  handleError(error: unknown): void {
    this.errorInterceptorService.interceptorsChain(error);
  }
}
