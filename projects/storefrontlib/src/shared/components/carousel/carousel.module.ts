import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { IntersectionModule } from '../../../layout/loading/intersection.module';
import { MediaModule } from '../media/media.module';
import { CarouselNavigationComponent } from './carousel-navigation/carousel-navigation.component';
import { CarouselPanelComponent } from './carousel-panel/carousel-panel.component';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    MediaModule,
    UrlModule,
    KeyboardFocusModule,
    IntersectionModule,
  ],
  declarations: [
    CarouselComponent,
    CarouselPanelComponent,
    CarouselNavigationComponent,
  ],
  exports: [CarouselComponent],
})
export class CarouselModule {}
