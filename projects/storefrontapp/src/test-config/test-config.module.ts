import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigFactory } from '@spartacus/core';

export function configFromWindowFactory() {
  return window['testCxConfig'] || {};
}

@NgModule({})
export class TestConfigModule {
  static forRoot(): ModuleWithProviders<TestConfigModule> {
    return {
      ngModule: TestConfigModule,
      providers: [provideConfigFactory(configFromWindowFactory)],
    };
  }
}
