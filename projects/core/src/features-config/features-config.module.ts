import { ModuleWithProviders, NgModule } from '@angular/core';

import { Config, provideConfig } from '../config/config.module';
import { FeaturesConfig } from './config/features-config';
import { FeatureLevelDirective } from './directives/feature-level.directive';
import { FeatureDirective } from './directives/feature.directive';

@NgModule({
  declarations: [FeatureLevelDirective, FeatureDirective],
  exports: [FeatureLevelDirective, FeatureDirective],
})
export class FeaturesConfigModule {
  static forRoot(
    defaultLevel?: string
  ): ModuleWithProviders<FeaturesConfigModule> {
    return {
      ngModule: FeaturesConfigModule,
      providers: [
        provideConfig(<FeaturesConfig>{
          features: {
            level: defaultLevel || '999',
          },
        }),
        {
          provide: FeaturesConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
