import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, normalizeHttpError } from '@spartacus/core';
import {
  NodesResponse,
  NODES_RESPONSE_NORMALIZER,
  SceneAdapter,
} from '@spartacus/epd-visualization/core';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
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
export class StorageV1Adapter implements SceneAdapter {
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

    return `${visualizationApiConfig.baseUrl}/vis/public/storage`;
  }

  protected getUrl(
    sceneId: string,
    nodeIds?: string[],
    $expand?: string[],
    $filter?: string[],
    contentType?: string
  ): string {
    const queryParts: string[] = [];
    if (nodeIds) {
      nodeIds.forEach((nodeId) => queryParts.push(`id=${nodeId}`));
    }
    if ($expand) {
      queryParts.push(`$expand=${$expand.join(',')}`);
    }
    if ($filter) {
      queryParts.push(`$filter=${$filter.join(',')}`);
    }
    if (contentType) {
      queryParts.push(`contentType=${contentType}`);
    }
    const queryString: string = queryParts.length
      ? `?${queryParts.join('&')}`
      : '';
    return `${this.baseUrl}/v1/scenes/${sceneId}/nodes${queryString}`;
  }

  /**
   * Used for getting information about scene nodes (such as metadata used to store usage ID values).
   * @param sceneId The scene id to use as the sceneId path parameter.
   * @param nodeIds An array of scene node ids to pass in id query parameters.
   * @param $expand A set of strings to combine to form the $expand query parameter.
   * @param $filter A set of strings to combine to form the $filter query parameter.
   * @param contentType The contentType query parameter.
   * @returns An Observable producing a NodesResponse which contains an array of objects describing scene nodes.
   */
  getNodes(
    sceneId: string,
    nodeIds?: string[],
    $expand?: string[],
    $filter?: string[],
    contentType?: string
  ): Observable<NodesResponse> {
    return this.http
      .get(this.getUrl(sceneId, nodeIds, $expand, $filter, contentType))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(NODES_RESPONSE_NORMALIZER)
      );
  }
}
