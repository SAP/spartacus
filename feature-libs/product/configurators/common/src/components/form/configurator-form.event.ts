import { Configurator } from '@spartacus/core';
export class ConfigFormUpdateEvent {
  productCode: string;
  changedAttribute: Configurator.Attribute;
}
