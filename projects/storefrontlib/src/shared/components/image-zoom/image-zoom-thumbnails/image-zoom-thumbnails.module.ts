import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule, MediaModule } from '@spartacus/storefront';
import { ImageZoomThumbnailsComponent } from './image-zoom-thumbnails.component';

@NgModule({
  imports: [CommonModule, CarouselModule, MediaModule],
  declarations: [ImageZoomThumbnailsComponent],
  exports: [ImageZoomThumbnailsComponent],
})
export class ImageZoomThumbnailsModule {}