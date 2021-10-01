import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';

@NgModule({
  imports: [CommonModule, IconModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualComponent: { component: VisualViewerToolbarButtonComponent },
      },
    } as CmsConfig),
  ],
  declarations: [VisualViewerToolbarButtonComponent],
  exports: [VisualViewerToolbarButtonComponent],
  entryComponents: [VisualViewerToolbarButtonComponent],
})
export class VisualViewerToolbarButtonModule {}
