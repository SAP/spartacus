/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { provideFeatureTogglesFactory } from '../features-config';
import { provideConfigFactory } from './config-providers';
import { getCookie } from './utils/get-cookie';

export const TEST_CONFIG_COOKIE_NAME = new InjectionToken<string>(
  'TEST_CONFIG_COOKIE_NAME'
);

/**
 * Resolves JSON config from the cookie of the given name.
 *
 * Be aware of the cookie limitations (4096 bytes).
 *
 * CAUTION: DON'T USE IT IN PRODUCTION!
 */
export const TEST_CONFIG = new InjectionToken<any>('TEST_CONFIG', {
  providedIn: 'root',
  factory: () => {
    const cookieName: string = inject(TEST_CONFIG_COOKIE_NAME);
    const platform: any = inject(PLATFORM_ID);
    const document: Document = inject(DOCUMENT);

    if (isPlatformBrowser(platform) && cookieName) {
      const config = getCookie(document.cookie, cookieName);
      return parseConfigJSON(config);
    }
    return {};
  },
});

export function parseConfigJSON(config: string) {
  try {
    return JSON.parse(decodeURIComponent(config));
  } catch (_) {
    return {};
  }
}

export interface TestConfigModuleOptions {
  cookie: string;
}

/**
 * Designed/intended to provide dynamic configuration for testing scenarios ONLY (e.g. e2e tests).
 *
 * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
 */
@NgModule({})
export class TestConfigModule {
  /**
   * Injects JSON config from the cookie of the given name.
   *
   * Be aware of the cookie limitations (4096 bytes).
   *
   * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
   */
  static forRoot(
    options: TestConfigModuleOptions
  ): ModuleWithProviders<TestConfigModule> {
    return {
      ngModule: TestConfigModule,
      providers: [
        {
          provide: TEST_CONFIG_COOKIE_NAME,
          useValue: options?.cookie,
        },

        // eslint-disable-next-line @nx/workspace/use-provide-default-feature-toggles-factory -- deliberately providing high priority FeatureToggles
        provideFeatureTogglesFactory(
          () => (inject(TEST_CONFIG) ?? {}).features
        ),
        // eslint-disable-next-line @nx/workspace/use-provide-default-config-factory -- deliberately providing a high priority FeatureConfig
        provideConfigFactory(() => inject(TEST_CONFIG)),
      ],
    };
  }
}
