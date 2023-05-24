/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { LogMetadata, SsrLogger, ssrLoggerToken } from '../ssr-logger';

/**
 * Factory provides logger that's used for pre-rendering purposes.
 */
export const ssrLoggerFactory = () => {
  const originalSsrLogger = inject(ssrLoggerToken, {
    skipSelf: true,
    optional: true,
  });
  return originalSsrLogger || new DefaultSsrLogger();
};

export class DefaultSsrLogger extends SsrLogger {
  log(message: string, context?: LogMetadata) {
    console.log({
      message,
      context: { timestamp: new Date().toISOString(), ...context },
    });
  }
  warn(message: string, context?: LogMetadata) {
    console.warn({ message, context });
  }
  error(message: string, context?: LogMetadata) {
    console.error({ message, context });
  }
}
