import { NgModule, ModuleWithProviders } from '@angular/core';

import { interceptors } from './http-interceptors/index';

@NgModule({})
export class PersonalizationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PersonalizationModule,
      providers: [...interceptors],
    };
  }
}
