import { Configurator } from './../../core/model/configurator.model';
export class ConfigFormUpdateEvent {
  ownerKey: string;
  changedAttribute: Configurator.Attribute;
}
