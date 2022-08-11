import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { CarouselModule, MediaModule } from '@spartacus/storefront';
import { AttributesModule } from './directives/attributes/attributes.module';
import { MerchandisingCarouselComponent } from './merchandising-carousel/merchandising-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    AttributesModule,
    CarouselModule,
    MediaModule,
    RouterModule,
    UrlModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MerchandisingCarouselComponent: {
          component: MerchandisingCarouselComponent,
        },
      },
    }),
  ],
  declarations: [MerchandisingCarouselComponent],
  exports: [MerchandisingCarouselComponent],
})
export class MerchandisingCarouselCmsModule {}
