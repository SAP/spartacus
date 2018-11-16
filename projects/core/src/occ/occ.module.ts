import { NgModule } from '@angular/core';

import { defaultOccConfig, OccConfig } from './config/config';
import { Config, ConfigModule } from '../config/config.module';

@NgModule({
  imports: [ConfigModule.withConfig(defaultOccConfig)],
  providers: [{ provide: OccConfig, useExisting: Config }]
})
export class OccModule {}
