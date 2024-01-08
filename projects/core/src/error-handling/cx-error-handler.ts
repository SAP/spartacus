/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class CxErrorHandler implements ErrorHandler {
  logger = inject(LoggerService);

  handleError(error: any): void {
    this.logger.error(error);
  }
}
