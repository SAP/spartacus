import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { VisualViewerAnimationSliderComponent } from './visual-viewer-animation-slider.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [VisualViewerAnimationSliderComponent],
  exports: [VisualViewerAnimationSliderComponent],
  entryComponents: [VisualViewerAnimationSliderComponent],
})
export class VisualViewerAnimationSliderModule {}
