import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsageId } from '../../models/usage-ids';
import { LookupVisualizationsResponse } from './lookup-visualizations-response';
import { VisualizationAdapter } from './visualization.adapter';

@Injectable({
  providedIn: 'root',
})
export class VisualizationConnector {
  constructor(protected visualizationAdapter: VisualizationAdapter) {}

  /**
   * Used for finding a visualization by Usage ID that has anonymous (unauthenticated) read access enabled.
   * The search is performed in the SAP EPD Visualization service instance associated with the SaaS subscription for the SAP EPD tenant.
   * @param visualizationUsageId The SAP EPD Visualization usage ID value identifying visualizations to match.
   * Only visualizations that have the specified usage ID value will be returned.
   * @param folderUsageId The SAP EPD Visualization usage ID identifying folders to search for visualizations.
   * Only folders that are tagged with the specified usage ID value that have anonymous access enabled will be searched.
   * @returns An Observable<LookupVisualizationsResponse> returning objects describing matched visualizations.
   */
  lookupVisualization(
    visualizationUsageId: UsageId,
    folderUsageId: UsageId
  ): Observable<LookupVisualizationsResponse> {
    return this.visualizationAdapter.lookupVisualization(
      visualizationUsageId,
      folderUsageId
    );
  }
}
