import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { VisualViewerAnimationSliderComponent } from './visual-viewer-animation-slider.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualViewerAnimationSliderComponent: {
          component: VisualViewerAnimationSliderComponent,
        },
      },
    } as CmsConfig),
  ],
  declarations: [VisualViewerAnimationSliderComponent],
  exports: [VisualViewerAnimationSliderComponent],
  entryComponents: [VisualViewerAnimationSliderComponent],
})
export class VisualViewerAnimationSliderModule {}
