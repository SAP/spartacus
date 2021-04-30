import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { QUALTRICS_FEATURE } from './feature-name';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        [QUALTRICS_FEATURE]: {
          cmsComponents: ['QualtricsComponent'],
        },
      },
    }),
  ],
})
export class QualtricsRootModule {}
