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

export type TMatrix = number[];

export enum NodeContentType {
  UNKNOWN = 'UNKNOWN',
  GEOMETRY = 'GEOMETRY',
  PMI = 'PMI',
  DRAWING = 'DRAWING',
  ANNOTATION = 'ANNOTATION',
  ANIMATION = 'ANIMATION',
  VIEWPORT_GROUP = 'VIEWPORT_GROUP',
  DETAIL_VIEWS = 'DETAIL_VIEWS',
  CAMERA = 'CAMERA',
  MODEL_VIEW = 'MODEL_VIEW',
  SECTION_PLANE = 'SECTION_PLANE',
  PARAMETRIC = 'PARAMETRIC',
  PLAYBACK = 'PLAYBACK',
  REFERENCE = 'REFERENCE',
  MAX = 'MAX',
}

export enum RenderMethod {
  DEFAULT = 'DEFAULT',
  SOLID = 'SOLID',
  TRANSPARENT = 'TRANSPARENT',
  LINE_ILLUSTRATION = 'LINE_ILLUSTRATION',
  SOLID_OUTLINE = 'SOLID_OUTLINE',
  SHADED_ILLUSTRATION = 'SHADED_ILLUSTRATION',
}

export enum RenderStage {
  UNDERLAY_2D = 'UNDERLAY_2D',
  DEFAULT_3D = 'DEFAULT_3D',
  OVERLAY_2D = 'OVERLAY_2D',
}

export enum TransformType {
  NONE = 'NONE',
  BILLBOARD_VIEW = 'BILLBOARD_VIEW',
  ORTHO2D = 'ORTHO2D',
}

export interface TreeNode {
  description?: string;
  sid: string;
  parentSid?: string;
  name?: string;
  contentType?: NodeContentType;
  instanceVeId?: string;
  veId?: string;
  transform?: TMatrix;
  visible?: boolean;
  suppressed?: boolean;
  closed?: boolean;
  phantom?: boolean;
  opacity?: number;
  materialId?: string;
  meshId?: string;
  entityId?: string;
  children?: number[];
  metadata?: Metadatum[];
  geometry?: string[];
  renderOrder?: number;
  renderMethod?: RenderMethod;
  renderStage?: RenderStage;
  transformType?: TransformType;
  highlightStyleId?: string;
  joints?: AnimationJoint[];
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

export enum JointType {
  relative = 'relative',
  offset = 'offset',
  orientation = 'orientation',
  billboard = 'billboard',
  link = 'link',
}

export type Vector = number[];

export type Vector4 = number[];

export enum UnitShortName {
  nm = 'nm',
  um = 'um',
  mm = 'mm',
  cm = 'cm',
  m = 'm',
  km = 'km',
  in = 'in',
  ft = 'ft',
  mi = 'mi',
  pnt = 'pnt',
  pca = 'pca',
}

export interface AnimationJoint {
  id?: string;
  type?: JointType;
  parentSid?: string;
  childSid?: string;
  parent?: number;
  child?: number;
  t?: Vector;
  q?: Vector4;
  s?: Vector;
  aa?: Vector4;
  euler?: Vector4;
  pitch?: number;
  yaw?: number;
  roll?: number;
  tw?: Vector;
  sUnit?: UnitShortName;
  tUnit?: UnitShortName;
  action?: string;
  suppressed?: boolean;
}
