import { NgModule } from '@angular/core';

import { defaultOccConfig, OccConfig } from './config/config';
import { ConfigModule, Config } from '../config';

@NgModule({
  imports: [ConfigModule.withConfig(defaultOccConfig)],
  providers: [{ provide: OccConfig, useExisting: Config }]
})
export class OccModule {}
