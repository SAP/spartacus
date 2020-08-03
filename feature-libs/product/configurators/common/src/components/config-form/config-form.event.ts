import { Configurator } from '@spartacus/core';
export class ConfigFormUpdateEvent {
  productCode: string;
  groupId: string;
  changedAttribute: Configurator.Attribute;
}
