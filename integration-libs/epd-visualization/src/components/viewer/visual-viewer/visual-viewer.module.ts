import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { VisualViewerToolbarButtonModule } from './toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.module';
import { AnimationSliderModule } from './toolbar/animation-slider/animation-slider.module';
import { VisualViewerComponent } from './visual-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    VisualViewerToolbarButtonModule,
    AnimationSliderModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualComponent: { component: VisualViewerComponent },
      },
    } as CmsConfig),
  ],
  declarations: [VisualViewerComponent],
  exports: [VisualViewerComponent],
  entryComponents: [VisualViewerComponent],
})
export class VisualViewerModule {}
