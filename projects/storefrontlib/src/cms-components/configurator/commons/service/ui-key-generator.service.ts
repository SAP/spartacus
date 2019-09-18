import { Injectable } from '@angular/core';
import { Attribute } from '@spartacus/core';

@Injectable()
export class UIKeyGeneratorService {
  constructor() {}

  private SEPERATOR = '--';
  private PREFIX = 'cx-config';
  private PREFIX_LABEL = 'label';
  private PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
  private PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';

  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return (
      this.createAttributeUiKey(prefix, attributeId) + this.SEPERATOR + valueId
    );
  }

  createAttributeValueIdForConfigurator(
    currentAttribute: Attribute,
    value: string
  ): string {
    return this.createValueUiKey(
      currentAttribute.uiType,
      currentAttribute.name,
      value
    );
  }

  createAttributeUiKey(prefix: string, attributeId: string): string {
    return this.PREFIX + this.SEPERATOR + prefix + this.SEPERATOR + attributeId;
  }

  createAttributeIdForConfigurator(currentAttribute: Attribute): string {
    if (currentAttribute) {
      return this.createAttributeUiKey(
        currentAttribute.uiType,
        currentAttribute.name
      );
    }
  }

  createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string {
    let attributeUiKey = this.createAttributeUiKey(
      this.PREFIX_LABEL,
      attributeId
    );
    if (valueId) {
      attributeUiKey +=
        ' ' +
        this.createAttributeUiKey(prefix, attributeId) +
        this.SEPERATOR +
        valueId +
        ' ';
      if (typeof hasQuantity === 'boolean' && !hasQuantity) {
        attributeUiKey +=
          this.createAttributeUiKey(
            this.PREFIX_DDLB_OPTION_PRICE_VALUE,
            attributeId
          ) +
          this.SEPERATOR +
          valueId;
      } else {
        attributeUiKey +=
          this.createAttributeUiKey(
            this.PREFIX_OPTION_PRICE_VALUE,
            attributeId
          ) +
          this.SEPERATOR +
          valueId;
      }
    }
    return attributeUiKey;
  }
}
