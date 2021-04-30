import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPersonalizationConfig } from './config/default-personalization-config';
import { PERSONALIZATION_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';

@NgModule({
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultPersonalizationConfig),
    provideDefaultConfig({
      featureModules: {
        [PERSONALIZATION_FEATURE]: {
          cmsComponents: ['PersonalizationScriptComponent'],
        },
      },
    }),
  ],
})
export class PersonalizationRootModule {}
