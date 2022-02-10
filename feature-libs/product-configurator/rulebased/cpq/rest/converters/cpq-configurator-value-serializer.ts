import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorUtils } from './../cpq-configurator-utils';

@Injectable()
export class CpqConfiguratorValueSerializer
  implements Converter<Configurator.Configuration, Cpq.UpdateValue>
{
  convert(source: Configurator.Configuration): Cpq.UpdateValue {
    const attribute: Configurator.Attribute =
      CpqConfiguratorUtils.findFirstChangedAttribute(source);
    const updateValue: Cpq.UpdateValue = this.convertAttribute(
      attribute,
      source.configId
    );
    return updateValue;
  }

  protected convertAttribute(
    attribute: Configurator.Attribute,
    configurationId: string
  ): Cpq.UpdateValue {
    const updateInfo = CpqConfiguratorUtils.getUpdateInformation(attribute);
    const value = this.findFirstChangedValue(attribute);
    const updateAttribute: Cpq.UpdateValue = {
      configurationId: configurationId,
      standardAttributeCode: updateInfo.standardAttributeCode,
      attributeValueId: value.valueCode,
      quantity: value.quantity ?? 1,
      tabId: updateInfo.tabId,
    };

    return updateAttribute;
  }

  protected findFirstChangedValue(
    attribute: Configurator.Attribute
  ): Configurator.Value {
    if (attribute.values && attribute.values.length > 0) {
      return attribute.values[0];
    } else throw new Error('No values present');
  }
}
