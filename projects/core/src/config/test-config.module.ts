import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { provideConfigFactory } from './config.module';
import { getCookie } from './utils/get-cookie';

export function parseConfigJSON(config: string) {
  try {
    return JSON.parse(config);
  } catch (_) {
    return {};
  }
}

export function provideConfigFromCookie(cookieName: string) {
  function configFromCookieFactory(platform: any, document: Document) {
    if (isPlatformBrowser(platform)) {
      const config = getCookie(document.cookie, cookieName);
      return parseConfigJSON(config);
    }
    return {};
  }

  return provideConfigFactory(configFromCookieFactory, [PLATFORM_ID, DOCUMENT]);
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
  static fromCookie(cookieName: string): ModuleWithProviders<TestConfigModule> {
    return {
      ngModule: TestConfigModule,
      providers: [provideConfigFromCookie(cookieName)],
    };
  }
}
