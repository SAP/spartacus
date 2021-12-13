import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodesResponse } from './nodes-response';
import { SceneAdapter } from './scene.adapter';

@Injectable({
  providedIn: 'root',
})
export class StorageConnector {
  constructor(protected sceneAdapter: SceneAdapter) {}

  /**
   * Used for invoking the EPD Visualization Storage service GET /v1/scenes/{sceneId}/nodes endpoint.
   * @see https://api.sap.com/api/EPD_VISUALIZATION_STORAGE/resource
   * @param sceneId The scene id to use as the sceneId path parameter.
   * @param nodeIds An array of scene node ids to pass in id query parameters.
   * @param expand An array of strings to join to form the $expand query parameter.
   * @param filter An array of strings to join to form the $filter query parameter.
   * @param contentType The value to use as the contentType query parameter
   * @returns An Observable producing the NodesResponse payload.
   */
  getNodes(
    sceneId: string,
    nodeIds?: string[],
    $expand?: string[],
    $filter?: string[],
    contentType?: string
  ): Observable<NodesResponse> {
    return this.sceneAdapter.getNodes(
      sceneId,
      nodeIds,
      $expand,
      $filter,
      contentType
    );
  }
}
