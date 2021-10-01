import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private baseUrl: string;

  constructor(
    protected http: HttpClient,
    protected epdVisualizationConfig: EpdVisualizationConfig
  ) {
    this.baseUrl = `${epdVisualizationConfig?.apis?.baseUrl}/vis/public/storage`;
  }

  getNodes(
    sceneId: string,
    nodeIds?: string[],
    expand?: string[],
    filter?: string[],
    contentType?: string
  ) {
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
    );
  }
}
