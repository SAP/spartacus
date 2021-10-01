import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { AnimationSliderComponent } from './animation-slider.component';
import { SliderElementDirective } from './animation-slider-element.directive';
import { SliderHandleDirective } from './animation-slider-handle.directive';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualComponent: { component: AnimationSliderComponent },
      },
    } as CmsConfig),
  ],
  declarations: [
    AnimationSliderComponent,
    SliderElementDirective,
    SliderHandleDirective,
  ],
  exports: [AnimationSliderComponent],
  entryComponents: [AnimationSliderComponent],
})
export class AnimationSliderModule {}
