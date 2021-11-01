import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { UsageId } from '../models/usage-ids/usage-id';
import { UsageIdDefinition } from '../models/usage-ids/usage-id-definition';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class EpdVisualizationConfig implements Config {
  public ui5?: Ui5Config;
  public apis?: VisualizationApiConfig;
  public usageIds?: UsageIdConfig;
  public visualPicking?: VisualPickingConfig;
}

export abstract class Ui5Config {
  public bootstrapUrl: string;
}

export abstract class VisualizationApiConfig {
  public baseUrl: string;
}

export abstract class UsageIdConfig {
  public folderUsageId: UsageId;
  public productUsageId: UsageIdDefinition;
}

export abstract class VisualPickingConfig {
  public productReferenceType: string;
}

declare module '@spartacus/core' {
  interface Config extends EpdVisualizationConfig {}
}
