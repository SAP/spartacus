console.log('New carousel Module');
import { NgModule } from '@angular/core';
import { BannerCarouselModule } from './components/banner-carousel/banner-carousel.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule as CarouselComponentModule } from './components/carousel/carousel.module';

@NgModule({
  imports: [CarouselComponentModule, BannerCarouselModule],
  exports: [CarouselComponent],
})
export class CarouselModule {}
