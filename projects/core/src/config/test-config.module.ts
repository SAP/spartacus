import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { provideConfigFactory } from './config.module';
import { getCookie } from './utils/get-cookie';

export const TEST_CONFIG_COOKIE_NAME = new InjectionToken<string>(
  'TEST_CONFIG_COOKIE_NAME'
);

export function parseConfigJSON(config: string) {
  try {
    return JSON.parse(config);
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
 * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
 */
@NgModule({})
export class TestConfigModule {
  /**
   * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
   *
   * Injects JSON config from the cookie of the given name.
   *
   * Be aware of the cookie limitations (4096 bytes).
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
