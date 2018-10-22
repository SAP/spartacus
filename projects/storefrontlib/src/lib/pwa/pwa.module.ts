import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '../config/config.module';
import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';

@NgModule({
  imports: [ConfigModule.withConfig(defaultPWAModuleConfig)],
  providers: [{ provide: PWAModuleConfig, useExisting: Config }]
})
export class PwaModule {}
