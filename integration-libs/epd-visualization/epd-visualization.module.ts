import { NgModule } from '@angular/core';
import { EpdVisualizationComponentsModule } from '@spartacus/epd-visualization/components';
import { EpdVisualizationCoreModule } from '@spartacus/epd-visualization/core';
import { EpdVisualizationApiModule } from '@spartacus/epd-visualization/epd-visualization-api';

@NgModule({
  imports: [
    EpdVisualizationComponentsModule,
    EpdVisualizationCoreModule,
    EpdVisualizationApiModule,
  ],
})
export class EpdVisualizationModule {}
