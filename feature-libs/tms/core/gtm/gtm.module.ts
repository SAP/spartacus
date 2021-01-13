import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TmsConfig } from '../config/tms-config';
import { GoogleTagManagerService } from './gtm.service';

export function gtmFactory(
  service: GoogleTagManagerService,
  config?: TmsConfig
) {
  const result = () => {
    if (config?.tms?.gtm?.enabled) {
      service.collect();
    }
  };
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: gtmFactory,
      deps: [GoogleTagManagerService, TmsConfig],
      multi: true,
    },
  ],
})
export class GoogleTagManagerModule {}
