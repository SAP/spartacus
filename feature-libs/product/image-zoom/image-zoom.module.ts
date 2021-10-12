import { NgModule } from '@angular/core';
import { ImageZoomCoreModule } from '@spartacus/product/image-zoom/core';
import { ImageZoomComponentsModule } from '@spartacus/product/image-zoom/components';

@NgModule({
  imports: [ImageZoomCoreModule, ImageZoomComponentsModule],
})
export class ImageZoomModule {}
