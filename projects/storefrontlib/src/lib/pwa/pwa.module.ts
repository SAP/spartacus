import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn/add-to-home-screen-btn.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultPWAModuleConfig)],
  providers: [{ provide: PWAModuleConfig, useExisting: Config }],
  declarations: [AddToHomeScreenBtnComponent],
  exports: [AddToHomeScreenBtnComponent]
})
export class PwaModule {}
