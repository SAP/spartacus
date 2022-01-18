import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorUtils } from './../cpq-configurator-utils';

const VALUE_SEPARATOR = ',';

@Injectable()
export class CpqConfiguratorSerializer
  implements Converter<Configurator.Configuration, Cpq.UpdateAttribute>
{
  convert(source: Configurator.Configuration): Cpq.UpdateAttribute {
    const attribute: Configurator.Attribute =
      CpqConfiguratorUtils.findFirstChangedAttribute(source);
    let updateAttribute: Cpq.UpdateAttribute;
    if (source.updateType === Configurator.UpdateType.ATTRIBUTE_QUANTITY) {
      updateAttribute = this.convertQuantity(attribute, source.configId);
    } else {
      updateAttribute = this.convertAttribute(attribute, source.configId);
    }
    return updateAttribute;
  }

  protected convertQuantity(
    attribute: Configurator.Attribute,
    configId: string
  ): Cpq.UpdateAttribute {
    const updateInformation =
      CpqConfiguratorUtils.getUpdateInformation(attribute);

    const updateAttribute: Cpq.UpdateAttribute = {
      configurationId: configId,
      standardAttributeCode: updateInformation.standardAttributeCode,
      changeAttributeValue: { quantity: attribute.quantity },
      tabId: updateInformation.tabId,
    };
    return updateAttribute;
  }

  protected convertAttribute(
    attribute: Configurator.Attribute,
    configurationId: string
  ): Cpq.UpdateAttribute {
    const updateInformation =
      CpqConfiguratorUtils.getUpdateInformation(attribute);
    const updateAttribute: Cpq.UpdateAttribute = {
      configurationId: configurationId,
      standardAttributeCode: updateInformation.standardAttributeCode,
      changeAttributeValue: {},
      tabId: updateInformation.tabId,
    };

    if (
      attribute.uiType === Configurator.UiType.DROPDOWN ||
      attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT ||
      attribute.uiType === Configurator.UiType.RADIOBUTTON ||
      attribute.uiType === Configurator.UiType.RADIOBUTTON_PRODUCT ||
      attribute.uiType === Configurator.UiType.SINGLE_SELECTION_IMAGE
    ) {
      updateAttribute.changeAttributeValue.attributeValueIds =
        this.processSelectedSingleValue(attribute.selectedSingleValue);
    } else if (
      attribute.uiType === Configurator.UiType.CHECKBOXLIST ||
      attribute.uiType === Configurator.UiType.CHECKBOXLIST_PRODUCT ||
      attribute.uiType === Configurator.UiType.CHECKBOX ||
      attribute.uiType === Configurator.UiType.MULTI_SELECTION_IMAGE
    ) {
      updateAttribute.changeAttributeValue.attributeValueIds =
        this.prepareValueIds(attribute);
    } else if (
      attribute.uiType === Configurator.UiType.STRING ||
      attribute.uiType === Configurator.UiType.NUMERIC
    ) {
      updateAttribute.changeAttributeValue.userInput = attribute.userInput;
      if (!updateAttribute.changeAttributeValue?.userInput) {
        updateAttribute.changeAttributeValue.userInput = ' ';
      }
    }
    return updateAttribute;
  }

  protected processSelectedSingleValue(singleValue?: string): string {
    let processedValue = singleValue;
    if (!processedValue) {
      // Is required to remove the value
      processedValue = VALUE_SEPARATOR;
    }
    return processedValue;
  }

  protected prepareValueIds(attribute: Configurator.Attribute): string {
    let valueIds = '';
    const selectedValues = attribute.values?.filter((value) => value.selected);

    if (selectedValues && selectedValues.length > 0) {
      selectedValues.forEach((value) => {
        valueIds += value.valueCode + VALUE_SEPARATOR;
      });
    } else {
      // Is required to remove the value
      valueIds = VALUE_SEPARATOR;
    }
    return valueIds;
  }
}
