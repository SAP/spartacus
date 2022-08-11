import { NgModule } from '@angular/core';
import { SceneConnector, VisualizationConnector } from './connectors';
import { SceneNodeToProductLookupService } from './services/scene-node-to-product-lookup/scene-node-to-product-lookup.service';
import { VisualizationLookupService } from './services/visualization-lookup/visualization-lookup.service';

@NgModule({
  providers: [
    SceneConnector,
    VisualizationConnector,
    SceneNodeToProductLookupService,
    VisualizationLookupService,
  ],
})
export class EpdVisualizationCoreModule {}
