import { NgModule, ModuleWithProviders } from '@angular/core';

import { interceptors } from './http-interceptors';

@NgModule({})
export class SmartEditModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SmartEditModule,
      providers: [...interceptors]
    };
  }
}
