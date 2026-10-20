/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectionToken } from '@angular/core';

/**
 * Provides the runtime environment fetched from /config.json before Angular bootstraps.
 *
 * Provide this token before `bootstrapApplication()` with the result of `getRuntimeEnvironment()`
 * (CSR) or `getServerRuntimeEnvironment()` (SSR). `provideRuntimeOccConfig()` reads it
 * via DI and maps the known keys into Spartacus `OccConfig`.
 *
 * Kept in its own file so consumers (e.g. spartacus-bff) can import just the token
 * without pulling in the OCC mapping logic.
 */
export const RUNTIME_ENVIRONMENT = new InjectionToken<Record<string, string>>(
  'RuntimeEnvironment'
);
