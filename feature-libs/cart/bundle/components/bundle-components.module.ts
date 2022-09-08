import { NgModule } from '@angular/core';
import { BundleCarouselModule } from './bundle-carousel/bundle-carousel.module';
import { BundleMainModule } from './bundle-main/bundle-main.module';

@NgModule({
  imports: [BundleCarouselModule, BundleMainModule],
})
export class BundleComponentsModule {}
