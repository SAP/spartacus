import { NgModule } from '@angular/core';

import { OccConfig } from './config/occ-config';
import { Config, ConfigModule } from '../config/config.module';
import { defaultOccConfig } from './config/default-occ-config';
import { provideConfigValidator } from '../config';
import { occConfigValidator } from './config/occ-config-validator';

@NgModule({
  imports: [ConfigModule.withConfig(defaultOccConfig)],
  providers: [
    { provide: OccConfig, useExisting: Config },
    provideConfigValidator(occConfigValidator),
  ],
})
export class OccModule {}
