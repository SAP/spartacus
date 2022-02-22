import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class VisualizationLookupService {
  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected visualizationConnector: VisualizationConnector
  ) {}

  /**
   * Finds visualizations by usage id containing product code values.
   * The search space is limited to folders with a configured usage id value.
   * @param productCode The product code value to search for.
   * @returns An Observable producing an VisualizationInfo array containing the set of matching visualizations.
   */
  public findMatchingVisualizations(
    productCode: String
  ): Observable<VisualizationInfo[]> {
    const epdVisualization = this.epdVisualizationConfig
      .epdVisualization as EpdVisualizationInnerConfig;
    const usageIdConfig = epdVisualization.usageIds as UsageIdConfig;
    const productUsageId = usageIdConfig.productUsageId;
    const folderUsageId = usageIdConfig.folderUsageId;

    const usage: UsageId = {
      name: productUsageId.name as string,
      keys: [
        {
          name: productUsageId.keyName as string,
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
