/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { LoggingErrorHandler } from './logging-error-handler';
import { MULTI_ERROR_HANDLER } from './multi-error-handler';

export function provideMultiErrorHandler(): Provider[] {
  return [
    {
      provide: MULTI_ERROR_HANDLER,
      useExisting: LoggingErrorHandler,
      multi: true,
    },
  ];
}
