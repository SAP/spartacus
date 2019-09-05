import { DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigFactory } from '@spartacus/core';
import { getCookie } from './utils/get-cookie';

export const TEST_CONFIG_KEY = 'cxTestConfig';

// Reads the config chunk injected dynamically in e2e tests
export function testConfigFactory(document: Document) {
  const configString = getCookie(document.cookie, TEST_CONFIG_KEY);
  try {
    return JSON.parse(configString);
  } catch (_) {
    return {};
  }
}

@NgModule({})
export class TestConfigModule {
  /**
   * Injects JSON config from the cookie `cxTestConfig`.
   *
   * CAUTION: don't use it in production!
   *
   * Be aware of the cookie limitations (4096 bytes).
   */
  static forRoot(): ModuleWithProviders<TestConfigModule> {
    return {
      ngModule: TestConfigModule,
      providers: [provideConfigFactory(testConfigFactory, [DOCUMENT])],
    };
  }
}
