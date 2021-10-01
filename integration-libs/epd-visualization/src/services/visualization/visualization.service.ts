import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { UsageId } from '../../models/usage-ids/usage-id';

@Injectable({
  providedIn: 'root',
})
export class VisualizationService {
  private baseUrl: string;

  constructor(
    protected http: HttpClient,
    protected epdVisualizationConfig: EpdVisualizationConfig
  ) {
    this.baseUrl = `${epdVisualizationConfig?.apis?.baseUrl}/vis/public/visualization`;
  }

  lookupVisualization(visualizationUsageId: UsageId, folderUsageId: UsageId) {
    const queryParts: string[] = [];
    if (visualizationUsageId) {
      queryParts.push(
        `usage=${encodeURIComponent(JSON.stringify(visualizationUsageId))}`
      );
    }
    if (folderUsageId) {
      queryParts.push(
        `folderUsageId=${encodeURIComponent(JSON.stringify(folderUsageId))}`
      );
    }
    const queryString: string = queryParts.length
      ? `?${queryParts.join('&')}`
      : '';
    return this.http.get(
      `${this.baseUrl}/v1/lookup/visualization${queryString}`
    );
  }
}
