import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from './product-carousel.component';
import { MediaModule } from '../../ui/components/media/media.module';
import { BootstrapModule } from '../../bootstrap.module';
import { UrlTranslatorModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    BootstrapModule,
    UrlTranslatorModule
  ],
  declarations: [ProductCarouselComponent],
  entryComponents: [ProductCarouselComponent],
  exports: [ProductCarouselComponent]
})
export class ProductCarouselModule {}
