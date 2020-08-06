import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideConfig, I18nModule } from '@spartacus/core';
import {
  CarouselModule,
  IconModule,
  KeyboardFocusModule,
  MediaModule,
} from '@spartacus/storefront';
import { defaultImageZoomLayoutConfig } from './default-image-zoom-layout.config';
import { ImageZoomDialogComponent } from './dialog/image-zoom-dialog.component';
import { ProductThumbnailsModule } from './product-thumbnails/product-thumbnails.module';
import { ImageZoomProductViewComponent } from './product-view/image-zoom-product-view.component';
import { ImageZoomTriggerComponent } from './trigger/image-zoom-trigger.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    CarouselModule,
    IconModule,
    KeyboardFocusModule,
    ProductThumbnailsModule,
    I18nModule,
  ],
  providers: [provideConfig(defaultImageZoomLayoutConfig)],
  declarations: [
    ImageZoomDialogComponent,
    ImageZoomTriggerComponent,
    ImageZoomProductViewComponent,
  ],
  exports: [
    ImageZoomDialogComponent,
    ImageZoomTriggerComponent,
    ImageZoomProductViewComponent,
  ],
})
export class ImageZoomModule {}
