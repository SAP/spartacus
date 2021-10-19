import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideConfig,
  I18nModule,
  provideDefaultConfig,
  CmsConfig,
} from '@spartacus/core';
import {
  CarouselModule,
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { defaultProductImageZoomLayoutConfig } from './default-image-zoom-layout.config';
import { ImageZoomDialogComponent } from './image-zoom-dialog/image-zoom-dialog.component';
import { ImageZoomProductImagesComponent } from './image-zoom-product-images/image-zoom-product-images.component';
import { ImageZoomThumbnailsComponent } from './image-zoom-thumbnails/image-zoom-thumbnails.component';
import { ImageZoomTriggerComponent } from './image-zoom-trigger/image-zoom-trigger.component';
import { ImageZoomViewComponent } from './image-zoom-view/image-zoom-view.component';

@NgModule({
  imports: [
    CarouselModule,
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    MediaModule,
    OutletModule,
    RouterModule,
  ],
  providers: [
    provideConfig(defaultProductImageZoomLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductImagesComponent: {
          component: ImageZoomProductImagesComponent,
        },
      },
    }),
  ],
  declarations: [
    ImageZoomDialogComponent,
    ImageZoomProductImagesComponent,
    ImageZoomThumbnailsComponent,
    ImageZoomTriggerComponent,
    ImageZoomViewComponent,
  ],
  exports: [
    ImageZoomDialogComponent,
    ImageZoomProductImagesComponent,
    ImageZoomThumbnailsComponent,
    ImageZoomTriggerComponent,
    ImageZoomViewComponent,
  ],
})
export class ProductImageZoomModule {}
