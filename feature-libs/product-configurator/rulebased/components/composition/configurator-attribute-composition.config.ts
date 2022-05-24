import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export interface AttributeComponentAssignment {
  [componentType: string]: any;
}

export interface ConfiguratorAttributeComposition {
  attributeComponentAssignment?: AttributeComponentAssignment;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorAttributeCompositionConfig {
  productConfigurator?: ConfiguratorAttributeComposition;
}
