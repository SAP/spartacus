import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Config,
  provideConfig,
  provideConfigValidator,
  provideDefaultConfig,
} from '@spartacus/core';
import { CdsConfig } from './config/cds-config';
import { cdsConfigValidator } from './config/cds-config-validator';
import { DEFAULT_CDS_CONFIG } from './config/default-cds-config';
import { MerchandisingModule } from './merchandising/merchandising.module';
import { ProfileTagModule } from './profiletag/profile-tag.module';

@NgModule({
  imports: [ProfileTagModule, MerchandisingModule.forRoot()],
})
export class CdsModule {
  static forRoot(config: CdsConfig): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        provideDefaultConfig(DEFAULT_CDS_CONFIG),
        provideConfig(config),
        provideConfigValidator(cdsConfigValidator),
        { provide: CdsConfig, useExisting: Config },
      ],
    };
  }
}
