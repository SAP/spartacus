/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { DefaultServerLogger } from './default-server-logger';
import { serverLoggerToken } from './server-logger';

/**
 * Factory provides logger that's used for pre-rendering purposes.
 */
export const serverLoggerFactory = () => {
  const originalSsrLogger = inject(serverLoggerToken, {
    skipSelf: true,
    optional: true,
  });
  return originalSsrLogger || new DefaultServerLogger();
};
