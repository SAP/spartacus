import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '../config/config.module';
import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn/add-to-home-screen-btn.component';

@NgModule({
  imports: [ConfigModule.withConfig(defaultPWAModuleConfig)],
  providers: [{ provide: PWAModuleConfig, useExisting: Config }],
  declarations: [AddToHomeScreenBtnComponent],
  exports: [AddToHomeScreenBtnComponent]
})
export class PwaModule {}
