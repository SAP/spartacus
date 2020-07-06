import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  CarouselModule,
  IconModule,
  KeyboardFocusModule,
  MediaModule,
} from '@spartacus/storefront';
import { defaultImageZoomLayoutConfig } from './default-image-zoom-layout.config';
import { ImageZoomDialogComponent } from './dialog/image-zoom-dialog.component';
import { ImageZoomProductViewComponent } from './product-view/image-zoom-product-view.component';
import { ImageZoomTriggerComponent } from './trigger/image-zoom-trigger.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    CarouselModule,
    IconModule,
    KeyboardFocusModule,
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
