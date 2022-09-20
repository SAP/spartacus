import { NgModule } from '@angular/core';
import { BundleCarouselModule } from './bundle-carousel/bundle-carousel.module';
import { BundleMainModule } from './bundle-main/bundle-main.module';
import { ProductDetailsDialogModule } from './product-details-dialog';

@NgModule({
  imports: [BundleCarouselModule, BundleMainModule, ProductDetailsDialogModule],
})
export class BundleComponentsModule {}
