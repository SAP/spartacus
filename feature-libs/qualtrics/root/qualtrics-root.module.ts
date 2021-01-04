import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        qualtricsTest: {
          cmsComponents: ['QualtricsEmbeddedFeedbackComponent'],
        },
      },
    }),
  ],
})
export class QualtricsRootModule {
  consturctor() {
    console.log('qualtrics root module');
  }
}
