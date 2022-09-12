/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { EpdVisualizationComponentsModule } from '@commerce-storefront-toolset/epd-visualization/components';
import { EpdVisualizationCoreModule } from '@commerce-storefront-toolset/epd-visualization/core';
import { EpdVisualizationApiModule } from '@commerce-storefront-toolset/epd-visualization/epd-visualization-api';

@NgModule({
  imports: [
    EpdVisualizationComponentsModule,
    EpdVisualizationCoreModule,
    EpdVisualizationApiModule,
  ],
})
export class EpdVisualizationModule {}
