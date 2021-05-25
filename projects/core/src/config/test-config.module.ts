import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { getCookie } from './utils/get-cookie';
import { provideConfigFactory } from './config-providers';

export const TEST_CONFIG_COOKIE_NAME = new InjectionToken<string>(
  'TEST_CONFIG_COOKIE_NAME'
);

export function parseConfigJSON(config: string) {
  try {
    return JSON.parse(decodeURIComponent(config));
  } catch (_) {
    return {};
  }
}

export function configFromCookieFactory(
  cookieName: string,
  platform: any,
  document: Document
) {
  if (isPlatformBrowser(platform) && cookieName) {
    const config = getCookie(document.cookie, cookieName);
    return parseConfigJSON(config);
  }
  return {};
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
          useValue: options && options.cookie,
        },
        provideConfigFactory(configFromCookieFactory, [
          TEST_CONFIG_COOKIE_NAME,
          PLATFORM_ID,
          DOCUMENT,
        ]),
      ],
    };
  }
}
