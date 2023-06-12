/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, inject } from '@angular/core';

import { LoggerModule } from 'i18next';
import { LoggerService } from '../../../logger';

//TODO: add unit tests if approved
export const I18NEXT_LOGGER_PLUGIN = new InjectionToken<LoggerModule>(
  'I18NEXT_LOGGER_PLUGIN',
  {
    providedIn: 'root',
    factory: () => {
      const logger = inject(LoggerService);
      return {
        type: 'logger',
        log: (args) => logger.log(...args),
        warn: (args) => logger.warn(...args),
        error: (args) => logger.error(...args),
      };
    },
  }
);
