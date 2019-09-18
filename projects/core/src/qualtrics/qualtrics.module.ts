import { ModuleWithProviders, NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';

@NgModule({})
export class QualtricsModule {
  static forRoot(): ModuleWithProviders<QualtricsModule> {
    return {
      ngModule: QualtricsModule,
      providers: [...interceptors],
    };
  }
}
