import { Configurator } from '../../../../core/model/configurator.model';

/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */

export class ConfiguratorAttributeBaseComponent {
  private static SEPERATOR = '--';
  private static PREFIX = 'cx-configurator';
  private static PREFIX_LABEL = 'label';
  private static PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
  private static PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';

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
      this.createAttributeUiKey(prefix, attributeId) +
      ConfiguratorAttributeBaseComponent.SEPERATOR +
      valueId
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
      this.getUiType(currentAttribute),
      currentAttribute.name,
      value
    );
  }

  protected getUiType(attribute: Configurator.Attribute): string {
    return attribute.uiType
      ? attribute.uiType
      : Configurator.UiType.NOT_IMPLEMENTED;
  }

  /**
   * Creates unique key for config attribute on the UI
   * @param prefix for key depending on usage (e.g. uiType, label)
   * @param attributeId
   */
  createAttributeUiKey(prefix: string, attributeId: string): string {
    return (
      ConfiguratorAttributeBaseComponent.PREFIX +
      ConfiguratorAttributeBaseComponent.SEPERATOR +
      prefix +
      ConfiguratorAttributeBaseComponent.SEPERATOR +
      attributeId
    );
  }

  /**
   * Creates unique key for config attribute to be sent to configurator
   * @param currentAttribute
   */
  createAttributeIdForConfigurator(
    currentAttribute: Configurator.Attribute
  ): string {
    return this.createAttributeUiKey(
      this.getUiType(currentAttribute),
      currentAttribute.name
    );
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
      ConfiguratorAttributeBaseComponent.PREFIX_LABEL,
      attributeId
    );
    if (valueId) {
      attributeUiKey +=
        ' ' +
        this.createAttributeUiKey(prefix, attributeId) +
        ConfiguratorAttributeBaseComponent.SEPERATOR +
        valueId +
        ' ';
      if (typeof hasQuantity === 'boolean' && !hasQuantity) {
        attributeUiKey +=
          this.createAttributeUiKey(
            ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfiguratorAttributeBaseComponent.SEPERATOR +
          valueId;
      } else {
        attributeUiKey +=
          this.createAttributeUiKey(
            ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfiguratorAttributeBaseComponent.SEPERATOR +
          valueId;
      }
    }
    return attributeUiKey;
  }

  /**
   * Creates a unique key for focus handling for the given attribute and value
   * @param attributeId
   * @param valueCode
   * @returns focus key
   */
  createFocusId(attributeId: string, valueCode: string): string {
    return `${attributeId}--${valueCode}--focus`;
  }

  /**
   * Get code from attribute.
   * The code is not a mandatory attribute (since not available for VC flavour),
   * still it is mandatory in the context of CPQ. Calling this method therefore only
   * makes sense when CPQ is active. In case the method is called in the wrong context, an exception will
   * be thrown
   *
   * @param {Configurator.Attribute} Attribute
   * @returns {number} Attribute code
   */
  protected getAttributeCode(attribute: Configurator.Attribute): number {
    const code = attribute.attrCode;
    if (code) {
      return code;
    } else {
      throw new Error('No attribute code for: ' + attribute.name);
    }
  }
}
