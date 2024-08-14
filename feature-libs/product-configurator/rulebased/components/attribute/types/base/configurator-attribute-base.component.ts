/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import { Observable, of, take } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';

/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */

export class ConfiguratorAttributeBaseComponent {
  protected configuratorUISettingsConfig = inject(ConfiguratorUISettingsConfig);
  protected translation = inject(TranslationService);

  /**
   * as the service is stateful any using component shall provide it within the components declaration:
   *
   * @Component({ providers: [ConfiguratorAttributePriceChangeService] })
   *
   * otherwise the service will be null. Hence the service is marked as optional here.
   */
  protected configuratorAttributePriceChangeService = inject(
    ConfiguratorAttributePriceChangeService,
    { optional: true }
  );
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );

  private _featureConfigService = inject(FeatureConfigService);

  private static SEPERATOR = '--';
  private static PREFIX = 'cx-configurator';
  private static PREFIX_LABEL = 'label';
  private static PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
  private static PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';
  protected static MAX_IMAGE_LABEL_CHARACTERS = 16;

  listenForPriceChanges: boolean;
  changedPrices$: Observable<Record<string, Configurator.PriceDetails>> = of(
    {}
  ); // no delta rendering - always render directly only once with prices from configuration

  protected initPriceChangedEvent(
    isPricingAsync = false,
    attributeKey?: string
  ) {
    if (
      isPricingAsync &&
      this.configuratorAttributePriceChangeService &&
      this._featureConfigService.isEnabled('productConfiguratorDeltaRendering')
    ) {
      this.listenForPriceChanges = true;
      this.changedPrices$ =
        this.configuratorAttributePriceChangeService.getChangedPrices(
          attributeKey
        );
    }
  }

  /**
   * Creates unique key for config value on the UI
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   * Retrieves image label with or without technical name depending whether the expert mode is set or not.
   * If the length of the label is longer than 'MAX_IMAGE_LABEL_CHARACTERS' characters, it will be shortened and ellipsis will be added at the end.
   *
   * @param expMode - Is expert mode set?
   * @param label - value label
   * @param techName - value technical name
   * @param value - Configurator value
   */
  getImageLabel(
    expMode: boolean,
    label: string | undefined,
    techName: string | undefined,
    value?: Configurator.Value
  ): string {
    const labelForImage = this.getLabel(expMode, label, techName, value);
    return labelForImage?.trim().length >=
      ConfiguratorAttributeBaseComponent.MAX_IMAGE_LABEL_CHARACTERS
      ? labelForImage
          .substring(
            0,
            ConfiguratorAttributeBaseComponent.MAX_IMAGE_LABEL_CHARACTERS
          )
          .concat('...')
      : labelForImage;
  }

  /**
   * Fetches the first image for a given value
   *
   * @param value Value
   * @returns Image
   */
  getImage(value: Configurator.Value): Configurator.Image | undefined {
    const images = value.images;
    return images ? images[0] : undefined;
  }

  /**
   * Retrieves a translation key for a value with a price.
   *
   * @param isReadOnly - is attribute a read-only?
   * @returns - translation key for a value with price
   */
  getAriaLabelForValueWithPrice(isReadOnly: boolean): string {
    return isReadOnly
      ? 'configurator.a11y.readOnlyValueOfAttributeFullWithPrice'
      : 'configurator.a11y.valueOfAttributeFullWithPrice';
  }

  /**
   * Retrieves a translation key for a value.
   *
   * @param isReadOnly - is attribute a read-only?
   * @returns - translation key for a value with price
   */
  getAriaLabelForValue(isReadOnly: boolean): string {
    return isReadOnly
      ? 'configurator.a11y.readOnlyValueOfAttributeFull'
      : 'configurator.a11y.valueOfAttributeFull';
  }

  /**
   * Retrieves the styling classes for the image element.
   *
   * @param attribute
   * @param value
   * @param styleClass
   * @return - corresponding style classes for the image element
   */
  getImgStyleClasses(
    attribute: Configurator.Attribute,
    value: Configurator.Value,
    styleClass: string
  ): string {
    if (!this.isReadOnly(attribute)) {
      styleClass += ' cx-img-hover';
      if (value.selected) {
        styleClass += ' cx-img-selected';
      }
    }
    return styleClass;
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
   *
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

  /**
   * Retrieves the length of the value description.
   *
   * @returns - the length of the value description
   */
  getValueDescriptionLength(): number {
    return (
      this.configuratorUISettingsConfig.productConfigurator?.descriptions
        ?.valueDescriptionLength ?? 70
    );
  }

  protected isReadOnly(attribute: Configurator.Attribute): boolean {
    if (attribute.uiType) {
      return (
        attribute.uiType === Configurator.UiType.READ_ONLY ||
        attribute.uiType ===
          Configurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE ||
        attribute.uiType === Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE
      );
    }
    return false;
  }

  protected isValueDisplayed(
    attribute: Configurator.Attribute,
    value: Configurator.Value
  ): boolean {
    return (
      (this.isReadOnly(attribute) && value.selected) ||
      !this.isReadOnly(attribute)
    );
  }

  /**
   * Creates a text describing the current attribute that can be used as ARIA label.
   * Includes price information. If a total price is available this price will be used,
   * otherwise it falls back to the value price, or if no price is available,
   * no price information will be included in the text.
   *
   * @param attribute the attribute
   * @param value the value
   * @param considerSelectionState - optional, depending on the underlying UI control the screen
   * might announce the selection state on its own, so it is not always desired to include it here.
   * @returns translated text
   */
  protected getAriaLabelGeneric(
    attribute: Configurator.Attribute,
    value: Configurator.Value | undefined,
    considerSelectionState = false
  ): string {
    let ariaLabel = '';
    if (value) {
      const params: { value?: string; attribute?: string; price?: string } = {
        value: value.valueDisplay,
        attribute: attribute.label,
      };

      const includedSelected = considerSelectionState && value.selected;
      let key = includedSelected
        ? 'configurator.a11y.selectedValueOfAttributeFullWithPrice'
        : this.getAriaLabelForValueWithPrice(this.isReadOnly(attribute));
      if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
        params.price = value.valuePriceTotal.formattedValue;
      } else if (value.valuePrice && value.valuePrice?.value !== 0) {
        params.price = value.valuePrice.formattedValue;
      } else {
        key = includedSelected
          ? 'configurator.a11y.selectedValueOfAttributeFull'
          : this.getAriaLabelForValue(this.isReadOnly(attribute));
      }

      this.translation
        .translate(key, params)
        .pipe(take(1))
        .subscribe((text) => (ariaLabel = text));
    }

    return ariaLabel;
  }

  /**
   * Extract corresponding value price formula parameters.
   * For all non-single selection types types the complete price formula should be displayed at the value level.
   *
   * @param value - Configurator value
   * @return new price formula
   */
  extractValuePriceFormulaParameters(
    value: Configurator.Value | undefined
  ): ConfiguratorPriceComponentOptions {
    return {
      quantity: value?.quantity,
      price: value?.valuePrice,
      priceTotal: value?.valuePriceTotal,
      isLightedUp: value?.selected,
    };
  }

  /**
   * Merges the stored value price data into the given value, if available.
   * As the value might be read-only a new object will be returned combining price and value.
   *
   * @param value the value
   * @param changedPrices record of changed prices
   * @returns the new value with price
   */
  enrichValueWithPrice(
    value: Configurator.Value | undefined,
    changedPrices: Record<string, Configurator.PriceDetails>
  ): Configurator.Value | undefined {
    if (value && changedPrices && value.valueCode in changedPrices) {
      const price = changedPrices[value.valueCode];
      if (price) {
        value = { ...value, valuePrice: price };
      }
    }

    return value;
  }

  /**
   * Checks if the value is the last selected value.
   *
   * @param valueCode code of the value
   * @returns true, only if this value is the last selected value
   */
  isLastSelected(attributeName: string, valueCode: string): boolean {
    return this.configuratorStorefrontUtilsService.isLastSelected(
      attributeName,
      valueCode
    );
  }
}
