import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentType } from '../../models/visualizations/content-type';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  UsageIdConfig,
} from '../../config/epd-visualization-config';
import { UsageId } from '../../models/usage-ids/usage-id';
import {
  LookupVisualizationsResponse,
  VisualizationApiService,
} from '../visualization-api/visualization-api.service';
import { VisualizationInfo } from '../../models/visualizations/visualization-info';

@Injectable({
  providedIn: 'root',
})
export class VisualizationLookupService {
  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected visualizationService: VisualizationApiService
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

    return this.visualizationService
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
