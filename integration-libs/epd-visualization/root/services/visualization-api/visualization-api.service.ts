import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  VisualizationApiConfig,
} from '../../config/epd-visualization-config';
import { VisualizationInfo } from '../../models';
import { UsageId } from '../../models/usage-ids/usage-id';

@Injectable({
  providedIn: 'root',
})
export class VisualizationApiService {
  private visualizationApiBaseUrl: string;

  constructor(
    protected http: HttpClient,
    protected epdVisualizationConfig: EpdVisualizationConfig
  ) {
    const epdVisualization = this.epdVisualizationConfig
      .epdVisualization as EpdVisualizationInnerConfig;
    const visualizationApiConfig =
      epdVisualization.apis as VisualizationApiConfig;

    const baseUrl = visualizationApiConfig.baseUrl as string;
    this.visualizationApiBaseUrl = `${baseUrl}/vis/public/visualization`;
  }

  lookupVisualization(
    visualizationUsageId: UsageId,
    folderUsageId: UsageId
  ): Observable<LookupVisualizationsResponse> {
    const queryParts: string[] = [
      `usage=${encodeURIComponent(JSON.stringify(visualizationUsageId))}`,
      `folderUsageId=${encodeURIComponent(JSON.stringify(folderUsageId))}`,
    ];
    const queryString: string = `?${queryParts.join('&')}`;
    return this.http.get(
      `${this.visualizationApiBaseUrl}/v1/lookup/visualization${queryString}`
    ) as Observable<LookupVisualizationsResponse>;
  }
}

export interface LookupVisualizationsResponse {
  visualizations?: VisualizationInfo[];
}
