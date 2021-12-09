import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { UsageId } from '../models/usage-ids/usage-id';
import { UsageIdDefinition } from '../models/usage-ids/usage-id-definition';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class EpdVisualizationConfig implements Config {
  public epdVisualization?: EpdVisualizationInnerConfig;
}

export interface EpdVisualizationInnerConfig {
  ui5?: Ui5Config;
  apis?: VisualizationApiConfig;
  usageIds?: UsageIdConfig;
  visualPicking?: VisualPickingConfig;
}

export interface Ui5Config {
  bootstrapUrl: string;
}

export interface VisualizationApiConfig {
  baseUrl: string;
}

export interface UsageIdConfig {
  folderUsageId: UsageId;
  productUsageId: UsageIdDefinition;
}

export interface VisualPickingConfig {
  productReferenceType: string;
}

declare module '@spartacus/core' {
  interface Config extends EpdVisualizationConfig {}
}
