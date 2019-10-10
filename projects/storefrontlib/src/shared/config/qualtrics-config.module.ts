import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { QualtricsConfig } from './qualtrics-config';

@NgModule({})
export class QualtricsConfigModule {
  //TODO: instead forroot, put it in ngModule BRIAN
  static forRoot(): ModuleWithProviders<QualtricsConfigModule> {
    return {
      ngModule: QualtricsConfigModule,

      providers: [
        provideConfig({
          qualtrics: {},
        }),
        {
          provide: QualtricsConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
