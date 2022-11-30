/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { ServerOptions } from './model';

/**
 * Returns a factory function which resolves the server request URL.
 */
export function serverRequestUrlFactory(options?: ServerOptions): Function {
  return (): string => {
    const platformConfig = inject(INITIAL_CONFIG);
    const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN);
    const serverRequestUrl = inject(SERVER_REQUEST_URL, {
      optional: true,
      skipSelf: true,
    });

    // SSR mode
    if (serverRequestUrl) {
      // should override the automatically recognized origin
      if (options?.serverRequestOrigin) {
        return serverRequestUrl.replace(
          serverRequestOrigin,
          options.serverRequestOrigin
        );
      }

      return serverRequestUrl;
    }

    // prerendering mode (no express server)
    return serverRequestOrigin + platformConfig.url;
  };
}
