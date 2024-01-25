/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { VisualPickingTabModule } from './visual-picking/visual-picking-tab/visual-picking-tab.module';
import { VisualViewerModule } from './visual-viewer/visual-viewer.module';

@NgModule({
  declarations: [],
  imports: [VisualPickingTabModule, VisualViewerModule],
})
export class EpdVisualizationComponentsModule {}
