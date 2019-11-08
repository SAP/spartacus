import { NgModule } from '@angular/core';
import { Config, provideConfigValidator } from '@spartacus/core';
import { ProfileTagModule } from './cms-components/profile-tag/profile-tag.module';
import { cdsConfigValidator } from './config/cds-config-validator';
import { CdsConfig } from './config/cds.config';

@NgModule({
  imports: [ProfileTagModule],
  providers: [
    { provide: CdsConfig, useExisting: Config },
    provideConfigValidator(cdsConfigValidator),
  ],
})
export class CdsModule {}
