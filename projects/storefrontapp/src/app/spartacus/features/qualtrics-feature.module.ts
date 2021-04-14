import { NgModule } from '@angular/core';
import { QualtricsRootModule } from '@spartacus/qualtrics/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [QualtricsRootModule],
  providers: [
    provideConfig({
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
