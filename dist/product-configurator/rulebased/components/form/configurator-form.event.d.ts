import { Configurator } from '../../core/model/configurator.model';
export declare class ConfigFormUpdateEvent {
    changedAttribute: Configurator.Attribute;
    ownerKey: string;
    updateType?: Configurator.UpdateType;
}
export interface QuantityUpdateEvent {
    quantity: number;
    valueCode?: string;
}
