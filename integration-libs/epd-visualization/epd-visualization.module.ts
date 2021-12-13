import { NgModule } from '@angular/core';
import { EpdVisualizationComponentsModule } from '@spartacus/epd-visualization/components';
import { EpdVisualizationApiModule } from './epd-visualization-api/epd-visualization-api.module';

@NgModule({
  imports: [EpdVisualizationComponentsModule, EpdVisualizationApiModule],
})
export class EpdVisualizationModule {}
