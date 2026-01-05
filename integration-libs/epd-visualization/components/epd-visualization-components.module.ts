/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { VisualPickingTabModule } from './visual-picking/visual-picking-tab/visual-picking-tab.module';
import { VisualViewerModule } from './visual-viewer/visual-viewer.module';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
@NgModule({
  declarations: [],
  imports: [VisualPickingTabModule, VisualViewerModule],
})
export class EpdVisualizationComponentsModule {}
