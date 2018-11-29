import { NgModule } from '@angular/core';

import { OccConfig } from './config/occ-config';
import { Config, ConfigModule } from '../config/config.module';
import { defaultOccConfig } from './config/default-occ-config';

@NgModule({
  imports: [ConfigModule.withConfig(defaultOccConfig)],
  providers: [{ provide: OccConfig, useExisting: Config }]
})
export class OccModule {}
