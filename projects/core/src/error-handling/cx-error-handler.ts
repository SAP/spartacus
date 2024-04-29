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
 * @method handleError - Handles the error by passing it to the registered multi error handlers.
 *
 * @public
 */
@Injectable()
export class CxErrorHandler implements ErrorHandler {
  //TODO: Keep it updated with the latest version of Spartacus
  /**
   * @deprecated Since 6.6 - `LoggerService` is unused here. Instead it's now used in `LoggingErrorHandler`.
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
