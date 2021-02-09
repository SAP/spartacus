import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAdobeExperiencePlatformConfig } from './config/default-aep.config';

@NgModule({})
export class AepModule {
  static forRoot(): ModuleWithProviders<AepModule> {
    return {
      ngModule: AepModule,
      providers: [provideDefaultConfig(defaultAdobeExperiencePlatformConfig)],
    };
  }
}
