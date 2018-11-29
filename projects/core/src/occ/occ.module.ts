import { NgModule } from '@angular/core';

import { OccConfig } from './config/occ-config';
import { Config, ConfigModule } from '../config/config.module';
import { defaultOccConfig } from './config/default-occ-config';
import { InterceptorUtil } from './utils/interceptor-util';
import { OccMiscsService } from './miscs/miscs.service';

@NgModule({
  imports: [ConfigModule.withConfig(defaultOccConfig)],
  providers: [{ provide: OccConfig, useExisting: Config }],
  exports: [InterceptorUtil, OccMiscsService]
})
export class OccModule {}
