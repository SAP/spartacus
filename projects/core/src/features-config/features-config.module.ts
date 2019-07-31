import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeaturesConfig } from './config/features-config';
import { Config, provideConfig } from '../config/config.module';

@NgModule({})
export class FeaturesConfigModule {
  static forRoot(
    defaultLevel?: string
  ): ModuleWithProviders<FeaturesConfigModule> {
    return {
      ngModule: FeaturesConfigModule,
      providers: [
        provideConfig(<FeaturesConfig>{
          features: {
            level: defaultLevel || 'next',
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
