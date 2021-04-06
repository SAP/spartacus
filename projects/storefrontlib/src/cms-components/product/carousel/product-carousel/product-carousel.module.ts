console.log('old ProductCarouselModule');
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { CarouselModule } from 'projects/storefrontlib/src/shared/components/carousel/carousel.module';
import { KeyboardFocusModule } from '../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { MediaModule } from '../../../../shared/components/index';
import { ProductCarouselComponent } from './product-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MediaModule,
    RouterModule,
    UrlModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductCarouselComponent: {
          component: ProductCarouselComponent,
        },
      },
    }),
  ],
  declarations: [ProductCarouselComponent],
  // entryComponents: [ProductCarouselComponent],
  // exports: [ProductCarouselComponent],
})
export class ProductCarouselModule {}
