import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn/add-to-home-screen-btn.component';
import { AddToHomeScreenService } from './services/add-to-home-screen.service';
import { CommonModule } from '@angular/common';

export function PwaFactory(addToHomeScreenService) {
  const result = () => addToHomeScreenService.init();
  return result;
}

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultPWAModuleConfig)],
  providers: [
    { provide: PWAModuleConfig, useExisting: Config },
    {
      provide: APP_INITIALIZER,
      useFactory: PwaFactory,
      deps: [AddToHomeScreenService],
      multi: true
    },
    AddToHomeScreenService
  ],
  declarations: [AddToHomeScreenBtnComponent],
  exports: [AddToHomeScreenBtnComponent]
})
export class PwaModule {}
