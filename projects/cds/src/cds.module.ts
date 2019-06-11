import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { CdsConfig } from './config/config.model';

@NgModule({
  imports: [ConfigModule],
  providers: [{ provide: CdsConfig, useExisting: Config }],
})
export class CdsModule {}
