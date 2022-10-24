/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

// SPIKE TODO: change to a reasonable default, e.g. 10_000 (similar to max render time)
export const defaultServerBackendRequestTimeoutConfig = 5_000;

export const SERVER_BACKEND_REQUEST_TIMEOUT_CONFIG = new InjectionToken<number>(
  'SERVER_BACKEND_REQUEST_TIMEOUT_CONFIG',
  {
    providedIn: 'root',
    factory: () => defaultServerBackendRequestTimeoutConfig,
  }
);
