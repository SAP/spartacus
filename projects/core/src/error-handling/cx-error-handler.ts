/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggerService } from '../logger';
import { MULTI_ERROR_HANDLER } from './multi-error-handler';

/**
 * The CxErrorHandler is the default ErrorHandler for Spartacus.
 * It is responsible for handling errors and passing them to the registered multi error handlers.
 *
 * The prefix `Cx` was used to distinguish it from Angular's `ErrorHandler` class.
 * For more, see Angular docs: https://angular.dev/api/core/ErrorHandler
 *
 */
@Injectable()
export class CxErrorHandler implements ErrorHandler {
  /**
   * @deprecated Since 2211.29 - `LoggerService` is not used anymore in this class.
   *             Instead it's now used in `LoggingErrorHandler`.
   *             This property will be removed in the future together with removing
   *             the feature toggle `propagateErrorsToServer`.
   */
  protected logger = inject(LoggerService);
  protected errorHandlers = inject(MULTI_ERROR_HANDLER);

  /**
   * Error handler method. Handles the error by passing it to the registered multi error handlers.
   * @param error - The error to be handled.
   */
  handleError(error: unknown): void {
    this.errorHandlers.forEach((handler) => {
      handler.handleError(error);
    });
  }
}
