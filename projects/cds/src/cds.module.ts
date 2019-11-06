import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig, provideConfigValidator } from '@spartacus/core';
import { CdsConfig } from './cds-config';
import { cdsConfigValidator } from './cds-config-validator';
import { defaultCdsConfig } from './default-cds-config';

@NgModule()
export class CdsModule {
  static forRoot(): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        { provide: CdsConfig, useExisting: Config },
        provideConfig(defaultCdsConfig),
        provideConfigValidator(cdsConfigValidator),
      ],
    };
  }
}
