/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  SceneAdapter,
  VisualizationAdapter,
} from '@spartacus/epd-visualization/core';
import { StorageV1Adapter } from './adapters/storage-v1/storage-v1.adapter';
import { VisualizationV1Adapter } from './adapters/visualization-v1/visualization-v1.adapter';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@NgModule({
  providers: [
    { provide: SceneAdapter, useClass: StorageV1Adapter },
    { provide: VisualizationAdapter, useClass: VisualizationV1Adapter },
  ],
})
export class EpdVisualizationApiModule {}
