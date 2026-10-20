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
import { LoggerService, OccConfig, provideConfigInitializerFactory } from '@spartacus/core';
import { RUNTIME_ENVIRONMENT } from './runtime-environment.token';

const CX_RUNTIME_CONFIG_KEY = makeStateKey<Record<string, string>>(
  'cx-runtime-config'
);

/**
 * Registers a `CONFIG_INITIALIZER` that maps runtime environment variables
 * fetched from `/config.json` into Spartacus `OccConfig`.
 *
 * Keys mapped (mirrors the existing meta-tag mechanism):
 * - `OCC_BASE_URL`   → `backend.occ.baseUrl`
 * - `MEDIA_BASE_URL` → `backend.media.baseUrl`
 *
 * Empty string values are treated as absent — the key is skipped and the
 * lower-priority fallback (meta tag / buildProcess.env) remains active.
 *
 * Add this to your `app.config.ts` providers to opt in. Omit it to keep
 * the existing build-time injection behaviour unchanged.
 */
export function provideRuntimeOccConfig(): Provider[] {
  return [
    provideConfigInitializerFactory(() => {
      const transferState = inject(TransferState);
      const logger = inject(LoggerService);
      const runtimeEnv = inject(RUNTIME_ENVIRONMENT, { optional: true }) ?? {};

      return {
        scopes: ['backend'],
        configFactory: async (): Promise<OccConfig> => {
          // SSR: write fetched env into TransferState for the CSR shell.
          // CSR hydration: read it back (written by SSR).
          // Pure CSR (no SSR): TransferState is a no-op in the browser.
          if (!transferState.hasKey(CX_RUNTIME_CONFIG_KEY)) {
            transferState.set(CX_RUNTIME_CONFIG_KEY, runtimeEnv);
          }
          const env = transferState.get(CX_RUNTIME_CONFIG_KEY, runtimeEnv);

          const config: OccConfig = { backend: { occ: {}, media: {} } };

          const occBaseUrl = env['OCC_BASE_URL'];
          if (occBaseUrl) {
            config.backend!.occ!.baseUrl = occBaseUrl;
          }

          const mediaBaseUrl = env['MEDIA_BASE_URL'];
          if (mediaBaseUrl) {
            config.backend!.media!.baseUrl = mediaBaseUrl;
          }

          logger.debug(
            '[provideRuntimeOccConfig] resolved backend config:',
            config.backend
          );

          return config;
        },
      };
    }),
  ];
}
