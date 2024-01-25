/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
   * Retrieves label with or without technical name depending whether the expert mode is set or not.
   *
   * @param expMode - Is expert mode set?
   * @param label - value label
   * @param techName - value technical name
   * @param value - Configurator value
   */
  getLabel(
    expMode: boolean,
    label: string | undefined,
    techName: string | undefined,
    value?: Configurator.Value
  ): string {
    let title = label ? label : '';
    if (expMode && techName) {
      title += ` / [${techName}]`;
    }
    title += this.getValuePrice(value);
    return title;
  }

  /**
   * Fetches the first image for a given value
   * @param value Value
   * @returns Image
   */
  getImage(value: Configurator.Value): Configurator.Image | undefined {
    const images = value.images;
    return images ? images[0] : undefined;
  }

  protected getValuePrice(value: Configurator.Value | undefined): string {
    if (value?.valuePrice?.value && !value.selected) {
      if (value.valuePrice.value < 0) {
        return ` [${value.valuePrice?.formattedValue}]`;
      } else if (value.valuePrice.value > 0) {
        return ` [+${value.valuePrice?.formattedValue}]`;
      }
    }
    return '';
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

  /**
   * Checks if attribute type allows additional values
   * @param attribute Attribute
   * @returns true if attribute type allows to enter additional values
   */
  protected isWithAdditionalValues(attribute: Configurator.Attribute): boolean {
    const uiType = attribute.uiType;
    return (
      uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
      uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT
    );
  }

  protected isRequiredErrorMsg(attribute: Configurator.Attribute): boolean {
    return (attribute.required && attribute.incomplete) || false;
  }

  protected isUserInput(attribute: Configurator.Attribute): boolean {
    return (
      attribute.uiType === Configurator.UiType.STRING ||
      attribute.uiType === Configurator.UiType.NUMERIC
    );
  }

  protected isDropDown(attribute: Configurator.Attribute): boolean {
    return (
      attribute.uiType === Configurator.UiType.DROPDOWN ||
      attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT
    );
  }

  protected getSelectedValue(
    attribute: Configurator.Attribute
  ): Configurator.Value | undefined {
    return attribute.values?.find((value) => value.selected);
  }

  protected isNoValueSelected(attribute: Configurator.Attribute): boolean {
    const selectedValue = this.getSelectedValue(attribute);
    if (selectedValue) {
      return selectedValue.valueCode === Configurator.RetractValueCode;
    }
    return true;
  }
}
