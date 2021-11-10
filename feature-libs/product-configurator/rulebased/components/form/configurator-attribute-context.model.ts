import { Injectable } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';

/**
 * Context for configurator attribute types.
 */
@Injectable()
export class ConfiguratorAttributeContext {
  attribute: Configurator.Attribute;
}
