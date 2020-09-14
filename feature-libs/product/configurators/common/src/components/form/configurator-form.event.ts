import { Configurator } from './../../core/model/configurator.model';
export class ConfigFormUpdateEvent {
  productCode: string;
  changedAttribute: Configurator.Attribute;
}
