import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, normalizeHttpError } from '@spartacus/core';
import {
  LookupVisualizationsResponse,
  LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER,
  VisualizationAdapter,
} from '@spartacus/epd-visualization/core';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  UsageId,
  VisualizationApiConfig,
} from '@spartacus/epd-visualization/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * This adapter references an API that is expected to be deprecated and relocated
 * since multiple microservice APIs are being combined into a single namespace.
 * A new adapter implementation will be added and this one will be deprecated
 * when the new endpoint is available.
 */
@Injectable()
export class VisualizationV1Adapter implements VisualizationAdapter {
  constructor(
    protected http: HttpClient,
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected converter: ConverterService
  ) {
    this.baseUrl = this.getBaseUrl();
  }

  private baseUrl: string;

  private getBaseUrl() {
    const epdVisualization = this.epdVisualizationConfig
      .epdVisualization as EpdVisualizationInnerConfig;
    const visualizationApiConfig =
      epdVisualization.apis as VisualizationApiConfig;

    return `${visualizationApiConfig.baseUrl}/vis/public/visualization`;
  }

  protected getUrl(
    visualizationUsageId: UsageId,
    folderUsageId: UsageId
  ): string {
    const queryParts: string[] = [
      `usage=${encodeURIComponent(JSON.stringify(visualizationUsageId))}`,
      `folderUsageId=${encodeURIComponent(JSON.stringify(folderUsageId))}`,
    ];
    return `${this.baseUrl}/v1/lookup/visualization?${queryParts.join('&')}`;
  }

  /**
   * Used for finding a visualization by Usage ID that has anonymous (unauthenticated) read access enabled.
   * The search is performed in the SAP EPD Visualization service instance associated with the SaaS subscription for the SAP EPD tenant.
   * @param visualizationUsageId The SAP EPD Visualization usage ID value identifying visualizations to match.
   * Only visualizations that have the specified usage ID value will be returned.
   * @param folderUsageId The SAP EPD Visualization usage ID identifying folders to search for visualizations.
   * Only folders that are tagged with the specified usage ID value that have anonymous access enabled will be searched.
   * @returns An Observable producing a LookupVisualizationsResponse which contains an array of objects describing matched visualizations.
   */
  lookupVisualization(
    visualizationUsageId: UsageId,
    folderUsageId: UsageId
  ): Observable<LookupVisualizationsResponse> {
    return this.http.get(this.getUrl(visualizationUsageId, folderUsageId)).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converter.pipeable(LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER)
    );
  }
}
