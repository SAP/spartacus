import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultPersonalizationConfig } from './config/default-personalization-config';
import { PERSONALIZATION_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultPersonalizationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PERSONALIZATION_FEATURE]: {
        cmsComponents: ['PersonalizationScriptComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultPersonalizationConfig),
    provideDefaultConfigFactory(defaultPersonalizationComponentsConfig),
  ],
})
export class PersonalizationRootModule {}
