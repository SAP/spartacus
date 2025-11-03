/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ContentType,
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  UsageId,
  UsageIdConfig,
  VisualizationInfo,
} from '@spartacus/epd-visualization/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LookupVisualizationsResponse } from '../../connectors/visualization/lookup-visualizations-response';
import { VisualizationConnector } from '../../connectors/visualization/visualization.connector';

/**
 * @deprecated since v221121.3.0 - The epd-visualization integration library will be removed in the future.
 */
@Injectable({
  providedIn: 'root',
})
export class VisualizationLookupService {
  protected epdVisualizationConfig = inject(EpdVisualizationConfig);
  protected visualizationConnector = inject(VisualizationConnector);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  /**
   * Finds visualizations by usage id containing product code values.
   * The search space is limited to folders with a configured usage id value.
   * @param productCode The product code value to search for.
   * @returns An Observable producing an VisualizationInfo array containing the set of matching visualizations.
   */
  public findMatchingVisualizations(
    productCode: string
  ): Observable<VisualizationInfo[]> {
    const epdVisualization = this.epdVisualizationConfig
      .epdVisualization as EpdVisualizationInnerConfig;
    const usageIdConfig = epdVisualization.usageIds as UsageIdConfig;
    const productUsageId = usageIdConfig.productUsageId;
    const folderUsageId = usageIdConfig.folderUsageId;

    const usage: UsageId = {
      name: productUsageId.name,
      keys: [
        {
          name: productUsageId.keyName,
          value: productCode,
        },
      ],
    };

    return this.visualizationConnector
      .lookupVisualization(usage, folderUsageId)
      .pipe(
        map((data: LookupVisualizationsResponse) =>
          (data.visualizations as VisualizationInfo[]).filter(
            (item: any) =>
              item.contentType === ContentType.Model3D ||
              item.contentType === ContentType.Drawing2D
          )
        )
      );
  }
}
