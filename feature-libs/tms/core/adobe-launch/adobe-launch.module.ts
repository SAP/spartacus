import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TmsConfig } from '../config/tms-config';
import { AdobeLaunchService } from './adobe-launch.service';

export function adobeLaunchFactory(
  service: AdobeLaunchService,
  config?: TmsConfig
) {
  const result = () => {
    if (config?.tms?.adobeLaunch?.enabled) {
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
      deps: [AdobeLaunchService, TmsConfig],
      multi: true,
    },
  ],
})
export class AdobeLaunchModule {}
