import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  QualtricsRootModule,
  QUALTRICS_FEATURE,
} from '@spartacus/qualtrics/root';

@NgModule({
  imports: [QualtricsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [QUALTRICS_FEATURE]: {
          module: () =>
            import('@spartacus/qualtrics').then((m) => m.QualtricsModule),
        },
      },
    }),
  ],
})
export class QualtricsFeatureModule {}
