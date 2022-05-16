import { NgModule } from '@angular/core';
import {
  BundleRootModule,
  BUNDLE_CAROUSEL_FEATURE,
} from '@spartacus/cart/bundle/root';
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
        [BUNDLE_CAROUSEL_FEATURE]: {
          module: () =>
            import('feature-libs/cart/bundle/components/bundle-carousel').then(
              (m) => m.BundleCarouselModule
            ),
        },
      },
    }),
  ],
})
export class BundleFeatureModule {}
