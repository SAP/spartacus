/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, inject } from '@angular/core';

import { LoggerModule } from 'i18next';
import { LoggerService } from '../../../logger';

/**
 * Local, portable alias for i18next's `LoggerModule`.
 *
 * On Angular 22 / TS 6 the declaration emit (TS2883) refuses to reference
 * `LoggerModule` through its deep `node_modules/i18next` path in our public
 * `.d.ts`. Re-declaring the token's type as a local interface that `extends`
 * the i18next type keeps the public API self-contained and portable.
 */
export interface I18nextLoggerModule extends LoggerModule {}

/**
 * The logger plugin for i18next that delegates logging to the Spartacus LoggerService.
 * The logger plugin is used to log i18next events.
 * See more: https://www.i18next.com/misc/creating-own-plugins#logger
 */
export const I18NEXT_LOGGER_PLUGIN = new InjectionToken<I18nextLoggerModule>(
  'I18NEXT_LOGGER_PLUGIN',
  {
    providedIn: 'root',
    factory: (): I18nextLoggerModule => {
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
