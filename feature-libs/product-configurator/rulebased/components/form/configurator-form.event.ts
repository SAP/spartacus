import { Configurator } from '../../core/model/configurator.model';
export class ConfigFormUpdateEvent {
  changedAttribute: Configurator.Attribute;
  ownerKey: string;
  updateType?: Configurator.UpdateType;
}

export interface QuantityUpdateEvent {
  quantity: number;
  valueCode?: string;
}
