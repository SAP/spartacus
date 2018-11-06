import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ServiceWorkerModule,
  ɵangular_packages_service_worker_service_worker_b as RegistrationOptions
} from '@angular/service-worker';

import { Config, ConfigModule } from '@spartacus/core';

import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn/add-to-home-screen-btn.component';

export function pwaConfigurationFactory(
  pwaConfig: PWAModuleConfig
): RegistrationOptions {
  const pwaEnabled = pwaConfig.production && pwaConfig.pwa.enabled;
  return { enabled: pwaEnabled };
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
    }
  ],
  declarations: [AddToHomeScreenBtnComponent],
  exports: [AddToHomeScreenBtnComponent]
})
export class PwaModule {}
