import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        productCarousel: {
          cmsComponents: ['ProductCarouselComponent'],
        },
        productReferences: {
          cmsComponents: ['ProductReferencesComponent'],
        },
      },
    }),
  ],
})
export class ProductCarouselRootModule {}
