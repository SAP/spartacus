import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EpdVisualizationConfig,
  VisualizationApiConfig,
} from '../../config/epd-visualization-config';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService {
  private baseUrl: string;

  constructor(
    protected http: HttpClient,
    protected epdVisualizationConfig: EpdVisualizationConfig
  ) {
    const visualizationApiConfig =
      epdVisualizationConfig.apis as VisualizationApiConfig;
    this.baseUrl = `${visualizationApiConfig.baseUrl}/vis/public/storage`;
  }

  /**
   * Used for invoking the EPD Visualization Storage service GET /v1/scenes/{sceneId}/nodes endpoint.
   * @see https://api.sap.com/api/EPD_VISUALIZATION_STORAGE/resource
   * @param sceneId The scene id to use as the sceneId path parameter.
   * @param nodeIds An array of scene node ids to pass in id query parameters.
   * @param expand An array of strings to join with ',' separators to from the $expand query parameter.
   * @param filter An array of strings to join with ',' separators to from the $filter query parameter.
   * @param contentType The value to use as the contentType query parameter
   * @returns An Observable returning the parsed JSON response.
   */
  getNodes(
    sceneId: string,
    nodeIds?: string[],
    expand?: string[],
    filter?: string[],
    contentType?: string
  ): Observable<NodesResponse> {
    const queryParts: string[] = [];
    if (nodeIds) {
      nodeIds.forEach((nodeId) => queryParts.push(`id=${nodeId}`));
    }
    if (expand) {
      queryParts.push(`$expand=${expand.join(',')}`);
    }
    if (filter) {
      queryParts.push(`$filter=${filter.join(',')}`);
    }
    if (contentType) {
      queryParts.push(`contentType=${contentType}`);
    }
    const queryString: string = queryParts.length
      ? `?${queryParts.join('&')}`
      : '';
    return this.http.get(
      `${this.baseUrl}/v1/scenes/${sceneId}/nodes${queryString}`
    ) as Observable<NodesResponse>;
  }
}

export interface NodesResponse {
  nodes?: TreeNode[];
}

export interface TreeNode {
  sid: string;
  metadata?: Metadatum[];
}

export enum MetadatumValueType {
  string = 'string',
  integer = 'integer',
  float = 'float',
  date = 'date',
  blob = 'blob',
  string_array = 'string_array',
}

export interface Metadatum {
  source: string;
  category: string;
  tag: string;
  value: string;
  valueType: MetadatumValueType;
}
