import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ProductCarouselRootModule } from '@spartacus/product/cms/carousel/root';
import { ProductPdpRootModule } from '@spartacus/product/pdp/root';

@NgModule({
  imports: [ProductPdpRootModule, ProductCarouselRootModule],
  providers: [
    provideConfig({
      featureModules: {
        productPdp: {
          module: () =>
            import('feature-libs/product/pdp/public_api').then(
              (m) => m.ProductPdpModule
            ),
        },
        productCarousel: {
          module: () =>
            import('feature-libs/product/cms/public_api').then(
              (m) => m.ProductCmsModule
            ),
        },
      },
    }),
  ],
})
export class ProductFeatureModule {}
