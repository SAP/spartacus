import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CartBaseModule } from 'feature-libs/cart/base';
import { BundleCarouselComponent } from './bundle-carousel.component';

@NgModule({
  imports: [CommonModule, I18nModule, CartBaseModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BundleCarouselComponent: {
          component: BundleCarouselComponent,
        },
      },
    }),
  ],
  declarations: [BundleCarouselComponent],
  exports: [BundleCarouselComponent],
})
export class BundleCarouselModule {}
