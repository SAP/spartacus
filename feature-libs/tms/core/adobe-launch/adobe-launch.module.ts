import { APP_INITIALIZER, NgModule, Optional } from '@angular/core';
import { TmsConfig } from '../config/tms-config';
import { AdobeLaunchService } from './adobe-launch.service';

/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export function adobeLaunchFactory(
  service: AdobeLaunchService,
  config?: TmsConfig
) {
  const result = () => {
    if (config?.tms?.adobeLaunch?.events?.length) {
      service.collect();
    }
  };
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: adobeLaunchFactory,
      deps: [AdobeLaunchService, [new Optional(), TmsConfig]],
      multi: true,
    },
  ],
})
export class AdobeLaunchModule {}
