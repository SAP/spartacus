import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '../config/config.module';
import { CdsConfig } from './config/cds-config';
import { defaultCdsConfig } from './config/default-cds-config';

@NgModule({})
export class CdsModule {
  static forRoot(): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        provideConfig(defaultCdsConfig),
        { provide: CdsConfig, useExisting: Config },
      ],
    };
  }
}
