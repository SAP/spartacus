/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SceneConnector, VisualizationConnector } from './connectors';
import { SceneNodeToProductLookupService } from './services/scene-node-to-product-lookup/scene-node-to-product-lookup.service';
import { VisualizationLookupService } from './services/visualization-lookup/visualization-lookup.service';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@NgModule({
  providers: [
    SceneConnector,
    VisualizationConnector,
    SceneNodeToProductLookupService,
    VisualizationLookupService,
  ],
})
export class EpdVisualizationCoreModule {}
