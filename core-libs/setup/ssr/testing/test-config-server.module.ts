/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { TEST_CONFIG, TEST_CONFIG_COOKIE_NAME } from '@spartacus/core';
import { REQUEST } from '../public_api';

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
            const request = inject(REQUEST);
            if (request && cookieName) {
              const cookie = request.get('Cookie') ?? '';
              const config = getCookie(cookie, cookieName);
              return parseConfigJSON(config);
            }
            return {};
          },
        },
      ],
    };
  }
}
