/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { LoggerService } from '../../logger';
import { MultiErrorHandler } from './multi-error-handler';

/**
 * An error handler that logs errors using a logger service.
 * Intended to be used as part of a multi-error handler strategy.
 *
 * @see MultiErrorHandler
 */
@Injectable({
  providedIn: 'root',
})
export class LoggingErrorHandler implements MultiErrorHandler {
  protected logger = inject(LoggerService);

  handleError(error: Error): void {
    this.logger.error(error);
  }
}
