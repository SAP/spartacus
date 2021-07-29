import { Injectable } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';

/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorAttributeTypeUtilsService {
  private static SEPARATOR = '--';
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
      ConfiguratorAttributeTypeUtilsService.SEPARATOR +
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
      ConfiguratorAttributeTypeUtilsService.PREFIX +
      ConfiguratorAttributeTypeUtilsService.SEPARATOR +
      prefix +
      ConfiguratorAttributeTypeUtilsService.SEPARATOR +
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
      ConfiguratorAttributeTypeUtilsService.PREFIX_LABEL,
      attributeId
    );
    if (valueId) {
      attributeUiKey +=
        ' ' +
        this.createAttributeUiKey(prefix, attributeId) +
        ConfiguratorAttributeTypeUtilsService.SEPARATOR +
        valueId +
        ' ';
      if (typeof hasQuantity === 'boolean' && !hasQuantity) {
        attributeUiKey +=
          this.createAttributeUiKey(
            ConfiguratorAttributeTypeUtilsService.PREFIX_DDLB_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfiguratorAttributeTypeUtilsService.SEPARATOR +
          valueId;
      } else {
        attributeUiKey +=
          this.createAttributeUiKey(
            ConfiguratorAttributeTypeUtilsService.PREFIX_OPTION_PRICE_VALUE,
            attributeId
          ) +
          ConfiguratorAttributeTypeUtilsService.SEPARATOR +
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
  getAttributeCode(attribute: Configurator.Attribute): number {
    const code = attribute.attrCode;
    if (code) {
      return code;
    } else {
      throw new Error('No attribute code for: ' + attribute.name);
    }
  }
}
