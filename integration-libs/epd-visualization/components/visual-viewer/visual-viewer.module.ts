import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { VisualViewerAnimationSliderModule } from './toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.module';
import { VisualViewerToolbarButtonModule } from './toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.module';
import { VisualViewerComponent } from './visual-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    VisualViewerToolbarButtonModule,
    VisualViewerAnimationSliderModule,
    SpinnerModule,
  ],
  declarations: [VisualViewerComponent],
  exports: [VisualViewerComponent],
  entryComponents: [VisualViewerComponent],
})
export class VisualViewerModule {}
