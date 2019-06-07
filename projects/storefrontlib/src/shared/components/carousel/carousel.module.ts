import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { MediaModule } from '../media/media.module';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule, RouterModule, IconModule, MediaModule, UrlModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}
