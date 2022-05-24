import { Injectable } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';

@Injectable()
export class ConfiguratorAttributeCompositionContext {
  componentKey: string;
  attribute: Configurator.Attribute;
  configuration: Configurator.Configuration;
  group: Configurator.Group;
  language?: string;
}
