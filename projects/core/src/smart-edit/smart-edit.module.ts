import { NgModule, ModuleWithProviders } from '@angular/core';

import { SmartEditInterceptors } from './http-interceptors/index';

@NgModule({})
export class SmartEditModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SmartEditModule,
      providers: [...SmartEditInterceptors],
    };
  }
}
