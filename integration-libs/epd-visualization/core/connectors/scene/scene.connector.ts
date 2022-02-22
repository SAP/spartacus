import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodesResponse } from './nodes-response';
import { SceneAdapter } from './scene.adapter';

@Injectable({
  providedIn: 'root',
})
export class SceneConnector {
  constructor(protected sceneAdapter: SceneAdapter) {}

  /**
   * Used for invoking the EPD Visualization API for retrieving scene node information.
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
    return this.sceneAdapter.getNodes(
      sceneId,
      nodeIds,
      $expand,
      $filter,
      contentType
    );
  }
}
