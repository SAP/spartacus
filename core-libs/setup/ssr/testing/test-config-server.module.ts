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

export function getCookie(cookie: string, name: string) {
  const regExp = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)', 'g');
  const result: RegExpExecArray | null = regExp.exec(cookie);

  return (result && decodeURIComponent(result[1])) || '';
}

export function parseConfigJSON(config: string) {
  try {
    return JSON.parse(decodeURIComponent(config));
  } catch (_) {
    return {};
  }
}

/**
 * Extracts the cookie header from the request object.
 * Handles:
 * - Express Request (with `get()` method)
 * - Raw IncomingMessage (with headers object)
 * - Web standard Request (with Headers instance)
 */
function getCookieHeader(
  request: Request | ExpressRequest | IncomingMessage | null
): string | undefined {
  if (!request) {
    return undefined;
  }

  // Check if it's an Express Request (has get() method)
  if ('get' in request && typeof request.get === 'function') {
    return request.get('Cookie');
  }

  // Check if it's a Web standard Request (has Headers instance)
  if (
    'headers' in request &&
    request.headers instanceof Headers &&
    typeof request.headers.get === 'function'
  ) {
    return request.headers.get('cookie') ?? undefined;
  }

  // Fall back to raw IncomingMessage headers (plain object)
  if ('headers' in request && typeof request.headers === 'object') {
    const headers = request.headers as Record<string, string | string[]>;
    const cookieHeader = headers['cookie'];
    return Array.isArray(cookieHeader) ? cookieHeader[0] : cookieHeader;
  }

  return undefined;
}

/**
 * A counterpart of the `TestConfigModule` from `@spartacus/core`,
 * but for the Server platform.
 * @see {@link TestConfigModule}
 *
 * - It uses the cookie from the REQUEST object (but not from `document.cookie`).
 * - The `TestConfigModule` must be imported in the app module anyway.
 *
 * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
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
            const cookieName: string = inject(TEST_CONFIG_COOKIE_NAME);

            // Try Angular's REQUEST token first (modern path from AngularNodeAppEngine)
            // This can be an IncomingMessage (not Express Request)
            const angularRequest = inject(REQUEST, {
              optional: true,
            }) as IncomingMessage | null;

            // Try legacy Spartacus REQUEST token (Express Request)
            const legacyRequest = inject(LEGACY_REQUEST, { optional: true });

            const request = legacyRequest ?? angularRequest;

            if (request && cookieName) {
              const cookie = getCookieHeader(request) ?? '';
              const config = getCookie(cookie, cookieName);
              return parseConfigJSON(config);
            }
            return {};
          },
        },

        // Inject the test config into Spartacus config system (like TestConfigModule does for browser)
        // eslint-disable-next-line @nx/workspace/use-provide-default-feature-toggles-factory -- deliberately providing high priority FeatureToggles
        provideFeatureTogglesFactory(() => {
          const testConfig = inject(TEST_CONFIG) ?? {};
          return testConfig.features;
        }),
        // eslint-disable-next-line @nx/workspace/use-provide-default-config-factory -- deliberately providing a high priority Config
        provideConfigFactory(() => {
          return inject(TEST_CONFIG) ?? {};
        }),
      ],
    };
  }
}
