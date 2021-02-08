import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultAdobeExperiencePlatformConfig } from '@spartacus/tracking/tms/aep';
import { TmsConfig, TmsService } from '@spartacus/tracking/tms/core';
import { defaultGoogleTagManagerConfig } from '@spartacus/tracking/tms/gtm';

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
        provideDefaultConfig(defaultAdobeExperiencePlatformConfig),
        provideDefaultConfig(defaultGoogleTagManagerConfig),
        provideConfig(config),
      ],
    };
  }
}
