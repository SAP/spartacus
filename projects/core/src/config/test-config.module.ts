import { DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigFactory } from './config.module';
import { getCookie } from './utils/get-cookie';

export function parseConfigJSON(config: string) {
  try {
    return JSON.parse(config);
  } catch (_) {
    return {};
  }
}

export function provideConfigFromCookie(cookieName) {
  function configFromCookieFactory(document: Document) {
    const config = getCookie(document.cookie, cookieName);
    return parseConfigJSON(config);
  }

  return provideConfigFactory(configFromCookieFactory, [DOCUMENT]);
}

@NgModule({})
export class TestConfigModule {
  /**
   * Injects JSON config from the cookie of the given name.
   *
   * CAUTION: don't use it in production!
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
