import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { BundleRootModule } from '@spartacus/bundle/root';

@NgModule({
  imports: [BundleRootModule],
  providers: [
    provideConfig({
      featureModules: {
        bundle: {
          module: () => import('@spartacus/bundle').then((m) => m.BundleModule),
        },
      },
    }),
  ],
})
export class BundleFeatureModule {}
