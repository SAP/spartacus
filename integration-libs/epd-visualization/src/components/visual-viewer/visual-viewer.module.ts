import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { VisualViewerToolbarButtonModule } from './toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.module';
import { VisualViewerAnimationSliderModule } from './toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.module';
import { VisualViewerComponent } from './visual-viewer.component';
import { SpinnerModule } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    VisualViewerToolbarButtonModule,
    VisualViewerAnimationSliderModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualViewerComponent: { component: VisualViewerComponent },
      },
    } as CmsConfig),
  ],
  declarations: [VisualViewerComponent],
  exports: [VisualViewerComponent],
  entryComponents: [VisualViewerComponent],
})
export class VisualViewerModule {}
