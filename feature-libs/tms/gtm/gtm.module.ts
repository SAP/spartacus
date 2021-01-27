import { APP_INITIALIZER, NgModule, Optional } from '@angular/core';
import { TmsConfig } from '@spartacus/tms/core';
import { GoogleTagManagerService } from './services/gtm.service';

/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export function gtmFactory(
  service: GoogleTagManagerService,
  config?: TmsConfig
) {
  const result = () => {
    if (config?.tms?.gtm?.events?.length) {
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
      deps: [GoogleTagManagerService, [new Optional(), TmsConfig]],
      multi: true,
    },
  ],
})
export class GoogleTagManagerModule {}
