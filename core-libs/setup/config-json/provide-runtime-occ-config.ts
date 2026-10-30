/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Provider } from '@angular/core';
import { provideConfigFactory } from '@spartacus/core';
import { ENVIRONMENT, provideEnvironment } from './provide-environment';

/**
 * Maps `OCC_BASE_URL` from the runtime environment (`/config.json`) into
 * Spartacus `OccConfig.backend.occ.baseUrl`.
 *
 * Also registers `provideEnvironment()` which handles the SSR→CSR
 * TransferState handoff for the `ENVIRONMENT` token.
 *
 * Add this to your `app.config.ts` providers to opt in. Omit it to keep
 * the existing build-time injection behaviour unchanged.
 *
 * Media base URL is mapped separately — it is wired automatically via
 * `MediaModule.forRoot()` in `@spartacus/storefront`.
 */
export function provideRuntimeOccConfig(): Provider[] {
  return [
    ...provideEnvironment(),
    provideConfigFactory(() => {
      const env = inject(ENVIRONMENT);
      return env['OCC_BASE_URL']
        ? { backend: { occ: { baseUrl: env['OCC_BASE_URL'] } } }
        : {};
    }),
  ];
}
