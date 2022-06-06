import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { BundleCarouselComponent } from './bundle-carousel/bundle-carousel.component';
import { BundleCarouselModule } from './bundle-carousel/bundle-carousel.module';

@NgModule({
  imports: [BundleCarouselModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BundleCarouselComponent: {
          component: BundleCarouselComponent,
        },
      },
    }),
  ],
})
export class BundleComponentsModule {}
