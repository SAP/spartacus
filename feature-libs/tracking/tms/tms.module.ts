import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultAdobeLaunchConfig } from './config/default-aep.config';
import { defaultGoogleTagManagerConfig } from './config/default-gtm.config';
import { TmsConfig } from './config/tms-config';
import { TmsService } from './services/tms.service';

/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
export function tmsFactory(service: TmsService): () => void {
  const result = () => service.collect();
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: tmsFactory,
      deps: [TmsService],
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
