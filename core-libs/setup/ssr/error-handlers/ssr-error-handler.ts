/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ENABLE_CONTEXTUAL_SERVER_LOGGER } from '../logger';

export const ssrErrorHandlerFactory = () => {
  const isLoggerEnabled = inject(ENABLE_CONTEXTUAL_SERVER_LOGGER);

  return isLoggerEnabled ? inject(SsrErrorHandler) : new ErrorHandler();
};

@Injectable({
  providedIn: 'root',
})
export class SsrErrorHandler implements ErrorHandler {
  logger = inject(LoggerService);

  handleError(error: any): void {
    this.logger.error(error);
  }
}
