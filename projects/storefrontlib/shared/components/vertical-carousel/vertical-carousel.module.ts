import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { MediaModule } from '../media/media.module';
import { VerticalCarouselComponent } from './vertical-carousel.component';

@NgModule({
  imports: [CommonModule, RouterModule, IconModule, MediaModule, UrlModule],
  declarations: [VerticalCarouselComponent],
  exports: [VerticalCarouselComponent],
})
export class VerticalCarouselModule {}
