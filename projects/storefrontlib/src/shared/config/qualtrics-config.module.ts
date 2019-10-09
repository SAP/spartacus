import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { QualtricsConfig } from './qualtrics-config';

@NgModule({})
export class QualtricsConfigModule {
  //TODO: instead forroot, put it in ngModule BRIAN
  static forRoot(): ModuleWithProviders<QualtricsConfigModule> {
    return {
      ngModule: QualtricsConfigModule,
      providers: [
        {
          provide: QualtricsConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
