/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule, REQUEST, inject } from '@angular/core';
import {
  provideConfigFactory,
  provideFeatureTogglesFactory,
  TEST_CONFIG,
  TEST_CONFIG_COOKIE_NAME,
} from '@spartacus/core';
import { Request as ExpressRequest } from 'express';
import { IncomingMessage } from 'http';
import { REQUEST as LEGACY_REQUEST } from '../public_api';

/** Extracts a cookie value by name from a cookie string. */
export function getCookie(cookie: string, name: string): string {
  const regExp = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)', 'g');
  const result = regExp.exec(cookie);
  return (result && decodeURIComponent(result[1])) || '';
}

/** Parses a JSON config string, returning empty object on failure. */
export function parseConfigJSON(config: string): object {
  try {
    return JSON.parse(decodeURIComponent(config));
  } catch {
    return {};
  }
}

/**
 * Extracts the cookie header from various request types.
 * Supports Express Request, Web standard Request, and raw IncomingMessage.
 */
function getCookieHeader(
  request: Request | ExpressRequest | IncomingMessage | null
): string | undefined {
  if (!request) {
    return undefined;
  }

  // Express Request: has get() method
  if ('get' in request && typeof request.get === 'function') {
    return request.get('Cookie');
  }

  // Web standard Request: has Headers instance
  if (
    'headers' in request &&
    request.headers instanceof Headers &&
    typeof request.headers.get === 'function'
  ) {
    return request.headers.get('cookie') ?? undefined;
  }

  // Raw IncomingMessage: has plain headers object
  if ('headers' in request && typeof request.headers === 'object') {
    const headers = request.headers as Record<string, string | string[]>;
    const cookieHeader = headers['cookie'];
    return Array.isArray(cookieHeader) ? cookieHeader[0] : cookieHeader;
  }

  return undefined;
}

/**
 * Server-side counterpart of `TestConfigModule` from `@spartacus/core`.
 *
 * Reads test configuration from cookies in the request object, supporting
 * both modern (Angular's REQUEST) and legacy (Spartacus's REQUEST) SSR systems.
 *
 * CAUTION: FOR TESTING ONLY - NOT REVIEWED FOR PRODUCTION SECURITY.
 *
 * @see TestConfigModule
 */
@NgModule({})
export class TestConfigServerModule {
  static forRoot(): ModuleWithProviders<TestConfigServerModule> {
    return {
      ngModule: TestConfigServerModule,
      providers: [
        {
          provide: TEST_CONFIG,
          useFactory: () => {
            const cookieName = inject(TEST_CONFIG_COOKIE_NAME);
            const request =
              inject(LEGACY_REQUEST, { optional: true }) ??
              (inject(REQUEST, { optional: true }) as
                | Request
                | IncomingMessage
                | null);

            if (request && cookieName) {
              const cookie = getCookieHeader(request) ?? '';
              const config = getCookie(cookie, cookieName);
              return parseConfigJSON(config);
            }
            return {};
          },
        },

        // Inject test config into Spartacus config system
        // eslint-disable-next-line @nx/workspace/use-provide-default-feature-toggles-factory
        provideFeatureTogglesFactory(() => {
          const testConfig = inject(TEST_CONFIG) ?? {};
          return testConfig.features;
        }),
        // eslint-disable-next-line @nx/workspace/use-provide-default-config-factory
        provideConfigFactory(() => inject(TEST_CONFIG) ?? {}),
      ],
    };
  }
}
