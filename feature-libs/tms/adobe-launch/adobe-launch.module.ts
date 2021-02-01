import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { TmsConfig } from '@spartacus/tms/core';
import { AdobeLaunchService } from './services/adobe-launch.service';

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
export class AdobeLaunchModule {
  static forRoot(config?: TmsConfig): ModuleWithProviders<AdobeLaunchModule> {
    return {
      ngModule: AdobeLaunchModule,
      providers: [provideConfig(config)],
    };
  }
}
