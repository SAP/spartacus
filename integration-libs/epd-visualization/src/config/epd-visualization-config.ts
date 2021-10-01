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
}

abstract class Ui5Config {
  public bootstrapUrl: string;
}

abstract class VisualizationApiConfig {
  public baseUrl: string;
}

abstract class UsageIdConfig {
  public folderUsageId: UsageId;
  public sparePartUsageId: UsageIdDefinition;
}

declare module '@spartacus/core' {
  interface Config extends EpdVisualizationConfig {}
}
