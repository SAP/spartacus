import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, UrlModule } from '@spartacus/core';
import {
  CarouselModule,
  MediaModule,
} from '../../../../../../storefrontlib/src/shared/components/index';
import { MerchandisingProductCarouselComponent } from './merchandising-product-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MediaModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MerchandisingProductCarouselComponent: {
          component: MerchandisingProductCarouselComponent,
        },
      },
    }),
  ],
  declarations: [MerchandisingProductCarouselComponent],
  entryComponents: [MerchandisingProductCarouselComponent],
  exports: [MerchandisingProductCarouselComponent],
})
export class MerchandisingProductCarouselModule {}
