import { Configurator } from '@spartacus/core';

/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */

export class ConfigUIKeyGenerator {
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
      ConfigUIKeyGenerator.createAttributeUiKey(prefix, attributeId) +
      ConfigUIKeyGenerator.SEPERATOR +
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
    return ConfigUIKeyGenerator.createValueUiKey(
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
      ConfigUIKeyGenerator.PREFIX +
      ConfigUIKeyGenerator.SEPERATOR +
      prefix +
      ConfigUIKeyGenerator.SEPERATOR +
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
      return ConfigUIKeyGenerator.createAttributeUiKey(
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
    let attributeUiKey = ConfigUIKeyGenerator.createAttributeUiKey(
      ConfigUIKeyGenerator.PREFIX_LABEL,
      attributeId
    );
    if (valueId) {
      attributeUiKey +=
        ' ' +
        ConfigUIKeyGenerator.createAttributeUiKey(prefix, attributeId) +
        ConfigUIKeyGenerator.SEPERATOR +
        valueId +
        ' ';
      if (typeof hasQuantity === 'boolean' && !hasQuantity) {
        attributeUiKey +=
          ConfigUIKeyGenerator.createAttributeUiKey(
            ConfigUIKeyGenerator.PREFIX_DDLB_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfigUIKeyGenerator.SEPERATOR +
          valueId;
      } else {
        attributeUiKey +=
          ConfigUIKeyGenerator.createAttributeUiKey(
            ConfigUIKeyGenerator.PREFIX_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfigUIKeyGenerator.SEPERATOR +
          valueId;
      }
    }
    return attributeUiKey;
  }
}
