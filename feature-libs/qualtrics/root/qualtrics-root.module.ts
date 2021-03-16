import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        qualtrics: {
          cmsComponents: ['QualtricsComponent'],
        },
      },
    }),
  ],
})
export class QualtricsRootModule {}
