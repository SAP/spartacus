import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CarouselModule } from '@spartacus/storefront';
import { MerchandisingCarouselComponent } from './merchandising-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MerchandisingCarouselComponent: {
          component: MerchandisingCarouselComponent,
        },
      },
    }),
  ],
  declarations: [MerchandisingCarouselComponent],
  entryComponents: [MerchandisingCarouselComponent],
  exports: [MerchandisingCarouselComponent],
})
export class MerchandisingCarouselModule {}
