import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        qualtrics: {
          cmsComponents: ['QualtricsEmbeddedFeedbackComponent'],
        },
      },
    }),
  ],
})
export class QualtricsRootModule {}
