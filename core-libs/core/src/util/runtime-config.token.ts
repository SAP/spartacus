/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Resolved runtime environment token.
 *
 * Provided by `provideEnvironment()` from `@spartacus/setup`.
 * The value is derived from `RUNTIME_ENVIRONMENT` (the raw `/config.json` fetch
 * result) with SSR->CSR TransferState handoff, so it is consistent across
 * server render and client hydration.
 *
 * Inject this token (with `optional: true`) in config factories that need
 * values from `/config.json`. Do not inject `RUNTIME_ENVIRONMENT` directly.
 */
export const ENVIRONMENT = new InjectionToken<Record<string, string>>(
  'Environment'
);
