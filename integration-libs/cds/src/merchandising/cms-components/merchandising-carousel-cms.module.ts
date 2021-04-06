import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '@spartacus/content/carousel';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
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
  entryComponents: [MerchandisingCarouselComponent],
  exports: [MerchandisingCarouselComponent],
})
export class MerchandisingCarouselCmsModule {}
