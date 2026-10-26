/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  inject,
  makeStateKey,
  Provider,
  TransferState,
} from '@angular/core';
import { ENVIRONMENT } from '@spartacus/core';
import { RUNTIME_ENVIRONMENT } from './runtime-environment.token';

export { ENVIRONMENT } from '@spartacus/core';

const CX_ENVIRONMENT_STATE_KEY = makeStateKey<Record<string, string>>(
  'cx-runtime-config'
);

/**
 * Provides the `ENVIRONMENT` token.
 *
 * - SSR: writes the fetched `RUNTIME_ENVIRONMENT` value into `TransferState`
 * - CSR hydration: reads it back from `TransferState` (written by SSR)
 * - Pure CSR (no SSR): `TransferState` is a no-op; falls back to `RUNTIME_ENVIRONMENT`
 *
 * Include this once in your provider array (e.g. via `provideRuntimeOccConfig()`).
 * Calling it multiple times is safe — Angular deduplicates token providers.
 */
export function provideEnvironment(): Provider[] {
  return [
    {
      provide: ENVIRONMENT,
      useFactory: () => {
        const state = inject(TransferState);
        const runtimeEnv =
          inject(RUNTIME_ENVIRONMENT, { optional: true }) ?? {};

        if (!state.hasKey(CX_ENVIRONMENT_STATE_KEY)) {
          state.set(CX_ENVIRONMENT_STATE_KEY, runtimeEnv);
        }

        return state.get(CX_ENVIRONMENT_STATE_KEY, runtimeEnv);
      },
    },
  ];
}
