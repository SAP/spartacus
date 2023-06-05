/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';

import { LoggerModule } from 'i18next';
import { LoggerService } from '../../../logger';

//TODO: add unit tests if approved
@Injectable({
  providedIn: 'root',
})
export class I18nextLoggerPlugin {
  logger = inject(LoggerService);

  getPlugin(): LoggerModule {
    return {
      type: 'logger',
      log: (args) => this.logger.log(...args),
      warn: (args) => this.logger.warn(...args),
      error: (args) => this.logger.error(...args),
    };
  }
}
