import { Configurator } from '@spartacus/core';

/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */

export class ConfigUIKeyGeneratorService {
  private static SEPERATOR = '--';
  private static PREFIX = 'cx-config';
  private static PREFIX_LABEL = 'label';
  private static PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
  private static PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';

  /**
   * Creates unique key for config value on the UI
   * @param prefix for key depending on usage (e.g. uiType, label)
   * @param attributeId
   * @param valueId
   */
  static createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return (
      ConfigUIKeyGeneratorService.createAttributeUiKey(prefix, attributeId) +
      ConfigUIKeyGeneratorService.SEPERATOR +
      valueId
    );
  }

  /**
   * Creates unique key for config value to be sent to configurator
   * @param currentAttribute
   * @param value
   */
  static createAttributeValueIdForConfigurator(
    currentAttribute: Configurator.Attribute,
    value: string
  ): string {
    return ConfigUIKeyGeneratorService.createValueUiKey(
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
  static createAttributeUiKey(prefix: string, attributeId: string): string {
    return (
      ConfigUIKeyGeneratorService.PREFIX +
      ConfigUIKeyGeneratorService.SEPERATOR +
      prefix +
      ConfigUIKeyGeneratorService.SEPERATOR +
      attributeId
    );
  }

  /**
   * Creates unique key for config attribute to be sent to configurator
   * @param currentAttribute
   */
  static createAttributeIdForConfigurator(
    currentAttribute: Configurator.Attribute
  ): string {
    if (currentAttribute) {
      return ConfigUIKeyGeneratorService.createAttributeUiKey(
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
  static createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string {
    let attributeUiKey = ConfigUIKeyGeneratorService.createAttributeUiKey(
      ConfigUIKeyGeneratorService.PREFIX_LABEL,
      attributeId
    );
    if (valueId) {
      attributeUiKey +=
        ' ' +
        ConfigUIKeyGeneratorService.createAttributeUiKey(prefix, attributeId) +
        ConfigUIKeyGeneratorService.SEPERATOR +
        valueId +
        ' ';
      if (typeof hasQuantity === 'boolean' && !hasQuantity) {
        attributeUiKey +=
          ConfigUIKeyGeneratorService.createAttributeUiKey(
            ConfigUIKeyGeneratorService.PREFIX_DDLB_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfigUIKeyGeneratorService.SEPERATOR +
          valueId;
      } else {
        attributeUiKey +=
          ConfigUIKeyGeneratorService.createAttributeUiKey(
            ConfigUIKeyGeneratorService.PREFIX_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfigUIKeyGeneratorService.SEPERATOR +
          valueId;
      }
    }
    return attributeUiKey;
  }
}
