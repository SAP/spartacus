import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { provideConfig } from '@spartacus/core';
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
export class GoogleTagManagerModule {
  static forRoot(
    config?: TmsConfig
  ): ModuleWithProviders<GoogleTagManagerModule> {
    return {
      ngModule: GoogleTagManagerModule,
      providers: [provideConfig(config)],
    };
  }
}
