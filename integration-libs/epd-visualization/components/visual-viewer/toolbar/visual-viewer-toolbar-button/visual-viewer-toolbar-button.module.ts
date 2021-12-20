import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [VisualViewerToolbarButtonComponent],
  exports: [VisualViewerToolbarButtonComponent],
  entryComponents: [VisualViewerToolbarButtonComponent],
})
export class VisualViewerToolbarButtonModule {}
