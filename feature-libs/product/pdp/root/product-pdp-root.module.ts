import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        productPdp: {
          cmsComponents: ['ProductImagesComponent'],
        },
      },
    }),
  ],
})
export class ProductPdpRootModule {}
