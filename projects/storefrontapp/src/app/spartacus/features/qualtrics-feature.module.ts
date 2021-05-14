import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { QualtricsRootModule } from '@spartacus/qualtrics/root';

@NgModule({
  imports: [QualtricsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        qualtrics: {
          module: () =>
            import('@spartacus/qualtrics').then((m) => m.QualtricsModule),
        },
      },
    }),
  ],
})
export class QualtricsFeatureModule {}
