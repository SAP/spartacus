import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config } from '../config/config.module';
import { QualtricsConfig } from './config/qualtrics-config';

@NgModule({})
export class QualtricsConfigModule {
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
