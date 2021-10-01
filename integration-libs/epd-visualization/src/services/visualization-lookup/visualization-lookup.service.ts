import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { UsageId } from '../../models/usage-ids/usage-id';
import { VisualizationService } from '../visualization/visualization.service';
import { MatchingVisualization } from './model/matching-visualization';

@Injectable({
  providedIn: 'root',
})
export class VisualizationLookupService {
  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected visualizationService: VisualizationService
  ) {}

  public findMatchingVisualizations(
    productCode: String
  ): Observable<MatchingVisualization[]> {
    const usageIdConfig = this.epdVisualizationConfig?.usageIds;
    if (!usageIdConfig) {
      return of([]);
    }
    const sparePartUsageId = usageIdConfig?.sparePartUsageId;
    const folderUsageId = usageIdConfig?.folderUsageId;

    if (!sparePartUsageId || !folderUsageId) {
      return of([]);
    }
    const usage: UsageId = {
      name: sparePartUsageId?.name as string,
      keys: [
        {
          name: sparePartUsageId?.keyName as string,
          value: productCode,
        },
      ],
    };

    return this.visualizationService
      .lookupVisualization(usage, folderUsageId)
      .pipe(
        map((data: any) =>
          data.visualizations.map(
            (item: any) =>
              new MatchingVisualization(
                item.visualizationId,
                item.version,
                item.sceneId,
                item.contentType,
                item.category,
                item.folderId
              )
          )
        )
      );
  }
}
