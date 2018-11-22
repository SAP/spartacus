import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ServiceWorkerModule,
  ɵangular_packages_service_worker_service_worker_b as RegistrationOptions
} from '@angular/service-worker';

import { Config, ConfigModule } from '@spartacus/core';

import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenBtnComponent } from './components/add-to-home-screen-btn/add-to-home-screen-btn.component';
import { AddToHomeScreenBannerComponent } from './components/add-to-home-screen-banner/add-to-home-screen-banner.component';
import { AddToHomeScreenService } from './services/add-to-home-screen.service';

export function pwaConfigurationFactory(
  pwaConfig: PWAModuleConfig
): RegistrationOptions {
  return { enabled: (pwaConfig.production && pwaConfig.pwa.enabled) || false };
}

export function pwaFactory(addToHomeScreenService) {
  const result = () => addToHomeScreenService;
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultPWAModuleConfig),
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [
    { provide: PWAModuleConfig, useExisting: Config },
    {
      provide: RegistrationOptions,
      useFactory: pwaConfigurationFactory,
      deps: [Config]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: pwaFactory,
      deps: [AddToHomeScreenService],
      multi: true
    },
    AddToHomeScreenService
  ],
  declarations: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent],
  exports: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent]
})
export class PwaModule {}
