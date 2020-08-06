import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule, MediaModule } from '@spartacus/storefront';
import { ProductThumbnailsComponent } from './product-thumbnails.component';

@NgModule({
  imports: [CommonModule, CarouselModule, MediaModule],
  declarations: [ProductThumbnailsComponent],
  exports: [ProductThumbnailsComponent],
})
export class ProductThumbnailsModule {}
