/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { SERVER_REQUEST_ORIGIN } from '@spartacus/core';
import { ServerOptions } from './model';

/**
 * Default fallback origin used during build-time route extraction
 * when no SERVER_REQUEST_ORIGIN is provided.
 */
//TODO: still open problem - maybe it's possible to avoid bootstraping the app during route extraction, so this fallback is not required at all
const DEFAULT_BUILD_ORIGIN = 'http://localhost:4200';

/**
 * Returns a factory function which resolves the server request origin.
 *
 * Resolution order:
 * 1. Explicit `serverRequestOrigin` option passed to `provideServer()`
 * 2. `SERVER_REQUEST_ORIGIN` token from injector (set by Express engine during SSR)
 * 3. `SERVER_REQUEST_ORIGIN` environment variable
 * 4. Default fallback for build-time route extraction
 */
export function serverRequestOriginFactory(options?: ServerOptions): Function {
  return (): string => {
    const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN, {
      optional: true,
      skipSelf: true,
    });

    // Option 1: Explicit option passed to provideServer()
    // Usually used for prerendering mode, but can be SSR
    if (options?.serverRequestOrigin) {
      return options.serverRequestOrigin;
    }

    // Option 2: SSR mode - origin from Express engine via injector
    if (serverRequestOrigin) {
      return serverRequestOrigin;
    }

    // Option 3: Environment variable (for prerendering or build)
    const envOrigin =
      typeof process !== 'undefined'
        ? process.env?.['SERVER_REQUEST_ORIGIN']
        : undefined;
    if (envOrigin) {
      return envOrigin;
    }

    // Option 4: Fallback for build-time route extraction
    // This occurs during Angular CLI build when extracting routes for the manifest.
    // Since no actual rendering happens during route extraction (only route discovery),
    // using a fallback origin is safe and allows builds without explicit configuration.
    /* eslint-disable-next-line no-console */
    console.warn(
      `[Spartacus] SERVER_REQUEST_ORIGIN is not set. ` +
        `Using fallback origin "${DEFAULT_BUILD_ORIGIN}" for build-time route extraction. ` +
        `This is expected during "ng build" and does not affect runtime SSR behavior.`
    );

    return DEFAULT_BUILD_ORIGIN;
  };
}
