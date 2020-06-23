import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { CarouselModule } from '../carousel/carousel.module';
import { MediaModule } from '../media/media.module';
import { defaultImageZoomLayoutConfig } from './default-image-zoom-layout.config';
import { ImageZoomDialogComponent } from './dialog/image-zoom-dialog.component';
import { ImageZoomProductViewComponent } from './product-view/image-zoom-product-view.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    CarouselModule,
    IconModule,
    KeyboardFocusModule,
  ],
  providers: [provideConfig(defaultImageZoomLayoutConfig)],
  exports: [ImageZoomDialogComponent, ImageZoomProductViewComponent],
  declarations: [ImageZoomDialogComponent, ImageZoomProductViewComponent],
})
export class ImageZoomModule {}
