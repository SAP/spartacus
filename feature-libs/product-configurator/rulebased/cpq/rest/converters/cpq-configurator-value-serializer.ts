import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';

@Injectable()
export class CpqConfiguratorValueSerializer
  implements Converter<Configurator.Configuration, Cpq.UpdateValue> {
  convert(source: Configurator.Configuration): Cpq.UpdateValue {
    const attribute: Configurator.Attribute = this.findFirstChangedAttribute(
      source
    );
    const updateValue: Cpq.UpdateValue = this.convertAttribute(
      attribute,
      source.configId
    );
    return updateValue;
  }

  findFirstChangedAttribute(
    source: Configurator.Configuration
  ): Configurator.Attribute {
    return source.groups[0].attributes[0];
  }

  convertAttribute(
    attribute: Configurator.Attribute,
    configurationId: string
  ): Cpq.UpdateValue {
    const value = this.findFirstChangedValue(attribute);
    const updateAttribute: Cpq.UpdateValue = {
      configurationId: configurationId,
      standardAttributeCode: attribute.attrCode.toString(),
      attributeValueId: value.valueCode,
      quantity: value.quantity,
      tabId: attribute.groupId,
    };

    return updateAttribute;
  }

  findFirstChangedValue(attribute: Configurator.Attribute): Configurator.Value {
    return attribute.values[0];
  }
}
