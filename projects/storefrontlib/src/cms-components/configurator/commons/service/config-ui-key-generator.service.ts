import { Injectable } from '@angular/core';
import { Configurator } from '@spartacus/core';

/**
 * Serivce to provide unique keys for elements on the UI and for sending to configurator
 */
@Injectable({ providedIn: 'root' })
export class ConfigUIKeyGeneratorService {
  constructor() {}

  private SEPERATOR = '--';
  private PREFIX = 'cx-config';
  private PREFIX_LABEL = 'label';
  private PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
  private PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';

  /**
   * Creates unique key for config value on the UI
   * @param prefix for key depending on usage (e.g. uiType, label)
   * @param attributeId
   * @param valueId
   */
  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return (
      this.createAttributeUiKey(prefix, attributeId) + this.SEPERATOR + valueId
    );
  }

  /**
   * Creates unique key for config value to be sent to configurator
   * @param currentAttribute
   * @param value
   */
  createAttributeValueIdForConfigurator(
    currentAttribute: Configurator.Attribute,
    value: string
  ): string {
    return this.createValueUiKey(
      currentAttribute.uiType,
      currentAttribute.name,
      value
    );
  }

  /**
   * Creates unique key for config attribute on the UI
   * @param prefix for key depending on usage (e.g. uiType, label)
   * @param attributeId
   */
  createAttributeUiKey(prefix: string, attributeId: string): string {
    return this.PREFIX + this.SEPERATOR + prefix + this.SEPERATOR + attributeId;
  }

  /**
   * Creates unique key for config attribute to be sent to configurator
   * @param currentAttribute
   */
  createAttributeIdForConfigurator(
    currentAttribute: Configurator.Attribute
  ): string {
    if (currentAttribute) {
      return this.createAttributeUiKey(
        currentAttribute.uiType,
        currentAttribute.name
      );
    }
  }

  /**
   * Creates unique key for attribute 'aria-labelledby'
   * @param prefix
   * @param attributeId
   * @param valueId
   * @param hasQuantity
   */
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
