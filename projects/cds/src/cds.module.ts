import { NgModule } from '@angular/core';
import { Config, provideConfigValidator } from '@spartacus/core';
import { ProfileTagModule } from './components/profile-tag/profile-tag.module';
import { cdsConfigValidator } from './config/cds-config-validator';
import { CdsConfig } from './config/config.model';

@NgModule({
  imports: [ProfileTagModule],
  providers: [
    { provide: CdsConfig, useExisting: Config },
    provideConfigValidator(cdsConfigValidator),
  ],
})
export class CdsModule {}
