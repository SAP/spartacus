/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, inject } from '@angular/core';

import { LoggerModule } from 'i18next';
import { LoggerService } from '../../../logger';

/**
 * The logger plugin for i18next that delegates logging to the Spartacus LoggerService.
 * The logger plugin is used to log i18next events.
 * See more: https://www.i18next.com/misc/creating-own-plugins#logger
 */
export const I18NEXT_LOGGER_PLUGIN = new InjectionToken<LoggerModule>(
  'I18NEXT_LOGGER_PLUGIN',
  {
    providedIn: 'root',
    factory: () => {
      const logger = inject(LoggerService);
      return {
        type: 'logger',
        /**
         * @param args - Array of arguments. This is the only parameter that is an array. See more: https://www.i18next.com/misc/creating-own-plugins#logger
         */
        log: (args) => logger.log(...args),
        /**
         * @param args - Array of arguments. This is the only parameter that is an array. See more: https://www.i18next.com/misc/creating-own-plugins#logger
         */
        warn: (args) => logger.warn(...args),
        /**
         * @param args - Array of arguments. This is the only parameter that is an array. See more: https://www.i18next.com/misc/creating-own-plugins#logger
         */
        error: (args) => logger.error(...args),
      };
    },
  }
);
