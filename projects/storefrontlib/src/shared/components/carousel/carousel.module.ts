import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { MediaModule } from '../media/media.module';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule, RouterModule, MediaModule, UrlModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}
