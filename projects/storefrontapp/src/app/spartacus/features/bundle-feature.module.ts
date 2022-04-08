import { NgModule } from '@angular/core';
import { BundleRootModule } from '@spartacus/cart/bundle/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [BundleRootModule],
  providers: [
    provideConfig({
      featureModules: {
        bundle: {
          module: () =>
            import('feature-libs/cart/bundle/public_api').then(
              (m) => m.BundleModule
            ),
        },
      },
    }),
  ],
})
export class BundleFeatureModule {}
