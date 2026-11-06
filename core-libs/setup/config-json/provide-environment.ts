/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, makeStateKey, Provider, TransferState } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { ENVIRONMENT } from '@spartacus/core';
import { RUNTIME_ENVIRONMENT } from './runtime-environment.token';

export { ENVIRONMENT } from '@spartacus/core';

const CX_ENVIRONMENT_STATE_KEY =
  makeStateKey<Record<string, string>>('cx-runtime-config');

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

/**
 * Server-only companion to `provideEnvironment()`.
 *
 * The `ENVIRONMENT` token is provided with a lazy `useFactory`. During SSR, if
 * no component injects `ENVIRONMENT` while rendering, that factory never runs,
 * so the runtime config is never written into `TransferState`. Angular then
 * omits the `<script id="ng-state">` tag, and the browser re-fetches
 * `/config.json` on hydration even when SSR succeeded.
 *
 * The root cause: `provideRuntimeOccConfig()` registers a `ConfigChunk` token
 * (not a `CONFIG_INITIALIZER`). Config chunks are resolved lazily when `Config`
 * is assembled — `ConfigInitializerService` never eagerly invokes them, so
 * there is no guarantee `ENVIRONMENT` is injected before `TransferState` is
 * serialized into the HTML.
 *
 * `BEFORE_APP_SERIALIZED` fires after rendering but before `TransferState` is
 * serialized into the HTML. Injecting `ENVIRONMENT` inside the `useFactory`
 * forces the factory to run, guaranteeing the value is written to
 * `TransferState` and transferred to the browser.
 *
 * Add this to `app.config.server.ts` providers alongside `provideEnvironment()`
 * (SSR only). Safe to include once; Angular deduplicates.
 */
export function provideEnvironmentServer(): Provider[] {
  return [
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: () => {
        // Injecting ENVIRONMENT here (in the DI factory context) forces the lazy
        // ENVIRONMENT factory to execute, writing the runtime config to
        // TransferState before Angular serializes it into the HTML response.
        const _env = inject(ENVIRONMENT);
        return () => void _env;
      },
      multi: true,
    },
  ];
}
