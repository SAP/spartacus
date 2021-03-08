import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { BundleRootModule } from 'projects/core/src/cart/bundle/root/public_api';

@NgModule({
  imports: [BundleRootModule],
  providers: [
    provideConfig({
      featureModules: {
        bundle: {
          module: () =>
            import('projects/core/src/cart/bundle/public_api').then(
              (m) => m.BundleModule
            ),
        },
      },
    }),
  ],
})
export class BundleFeatureModule {}
