import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultAdobeLaunchConfig } from './config/default-adobe-launch.config';
import { defaultGoogleTagManagerConfig } from './config/default-gtm.config';
import { TmsConfig } from './config/tms-config';
import { tmsConfigValidator } from './config/tms-config-validator';
import { TmsService } from './services/tms.service';

/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export function tmsFactory(
  service: TmsService,
  config?: TmsConfig
): () => void {
  const result = () => {
    const validation = tmsConfigValidator(config);
    if (validation) {
      throw new Error(validation);
    }

    service.collect();
  };
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: tmsFactory,
      deps: [TmsService, [new Optional(), TmsConfig]],
      multi: true,
    },
  ],
})
export class TmsModule {
  static forRoot(config?: TmsConfig): ModuleWithProviders<TmsModule> {
    return {
      ngModule: TmsModule,
      providers: [
        provideDefaultConfig(defaultAdobeLaunchConfig),
        provideDefaultConfig(defaultGoogleTagManagerConfig),
        provideConfig(config),
      ],
    };
  }
}
