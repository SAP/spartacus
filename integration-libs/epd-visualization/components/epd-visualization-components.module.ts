import { NgModule } from '@angular/core';
import { VisualPickingTabModule } from './visual-picking/visual-picking-tab/visual-picking-tab.module';
import { VisualViewerModule } from './visual-viewer/visual-viewer.module';

@NgModule({
  declarations: [],
  imports: [VisualPickingTabModule, VisualViewerModule],
})
export class EpdVisualizationComponentsModule {}
