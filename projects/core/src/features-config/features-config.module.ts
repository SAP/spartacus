import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeaturesConfig } from './config/features-config';
import { Config, provideConfig } from '../config/config.module';
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
            level: defaultLevel || '*',
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
