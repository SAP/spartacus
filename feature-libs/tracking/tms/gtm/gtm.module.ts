import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultGoogleTagManagerConfig } from './config/default-gtm.config';

@NgModule({})
export class GtmModule {
  static forRoot(): ModuleWithProviders<GtmModule> {
    return {
      ngModule: GtmModule,
      providers: [provideDefaultConfig(defaultGoogleTagManagerConfig)],
    };
  }
}
