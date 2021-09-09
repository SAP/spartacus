import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { Config, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { AddToHomeScreenBannerComponent } from './components/add-to-home-screen-banner/add-to-home-screen-banner.component';
import { AddToHomeScreenBtnComponent } from './components/add-to-home-screen-btn/add-to-home-screen-btn.component';
import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenService } from './services/add-to-home-screen.service';

export function pwaConfigurationFactory(
  pwaConfig: PWAModuleConfig
): SwRegistrationOptions {
  return { enabled: (!isDevMode() && pwaConfig.pwa.enabled) || false };
}

export function pwaFactory(addToHomeScreenService): any {
  const result = () => addToHomeScreenService;
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js'),
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(defaultPWAModuleConfig),
    {
      provide: SwRegistrationOptions,
      useFactory: pwaConfigurationFactory,
      deps: [Config],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: pwaFactory,
      deps: [AddToHomeScreenService],
      multi: true,
    },
  ],
  declarations: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent],
  exports: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent],
})
export class PwaModule {}
