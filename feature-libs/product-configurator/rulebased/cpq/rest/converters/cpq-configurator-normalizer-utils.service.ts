import {
  formatCurrency,
  getCurrencySymbol,
  getLocaleId,
} from '@angular/common';
import { Injectable, isDevMode } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';

/**
 * Utilities for CPQ configuration
 */
@Injectable({ providedIn: 'root' })
export class CpqConfiguratorNormalizerUtilsService {
  constructor(protected languageService: LanguageService) {}

  /**
   * Converts quantity to be shown in the overview page
   *
   * @param {Cpq.Value} value - CPQ Value
   * @param {Cpq.Attribute} attribute - CPQ Attribute
   * @returns {number} - Quantity
   */
  convertQuantity(
    value: Cpq.Value,
    attribute: Cpq.Attribute
  ): number | undefined {
    if (!value.selected) {
      return undefined;
    }
    const configuratorDataType: Configurator.DataType =
      this.convertDataType(attribute);
    let quantity;
    switch (configuratorDataType) {
      case Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL:
        quantity = Number(attribute.quantity);
        break;
      case Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL:
        quantity = Number(value.quantity);
        break;
      default:
        quantity = undefined;
    }
    return quantity;
  }

  /**
   * Converts value price
   *
   * @param { Cpq.Value} value - CPQ Value
   * @param {string} currency - Currency code ISO
   * @returns {Configurator.PriceDetails}
   */
  convertValuePrice(
    value: Cpq.Value,
    currency: string
  ): Configurator.PriceDetails | undefined {
    let price;
    if (value.price) {
      price = {
        currencyIso: currency,
        value: parseFloat(value.price),
      };
      this.formatPriceForLocale(price, this.getLanguage());
    }
    return price;
  }

  /**
   * Calculates total value price
   *
   * @param {number} quantity - Quantity
   * @param {Configurator.PriceDetails} valuePrice - PriceDetails of the single value price
   * @returns {Configurator.PriceDetails } - total value price
   */
  calculateValuePriceTotal(
    quantity: number,
    valuePrice?: Configurator.PriceDetails
  ): Configurator.PriceDetails | undefined {
    let valuePriceTotal;
    if (valuePrice) {
      const calculationQuantity: number = quantity ? quantity : 1;
      valuePriceTotal = {
        currencyIso: valuePrice.currencyIso,
        value: calculationQuantity * valuePrice.value,
      };
      this.formatPriceForLocale(valuePriceTotal, this.getLanguage());
    }
    return valuePriceTotal;
  }

  /**
   * Calculates total attribute price
   *
   * @param {Configurator.Attribute} attribute - Configurator Attribute
   * @param {string} currency - Currency
   * @returns {Configurator.PriceDetails} - total attribute price
   */
  calculateAttributePriceTotal(
    attribute: Configurator.Attribute,
    currency: string
  ): Configurator.PriceDetails {
    const priceTotal = attribute.values
      ?.filter((entry) => entry.selected && entry.valuePriceTotal)
      .reduce((total, item) => total + (item.valuePriceTotal?.value ?? 0), 0);
    const attributePriceTotal: Configurator.PriceDetails = {
      currencyIso: currency,
      value: priceTotal ?? 0,
    };
    this.formatPriceForLocale(attributePriceTotal, this.getLanguage());
    return attributePriceTotal;
  }

  /**
   * Formats price for given PriceDetails object and Locale
   *
   * @param {Configurator.PriceDetails} price - Price details
   * @param {string} availableLocale - Original locale
   */
  protected formatPriceForLocale(
    price: Configurator.PriceDetails,
    availableLocale: string
  ): void {
    const currencySymbol: string = getCurrencySymbol(
      price.currencyIso,
      'narrow',
      availableLocale
    );
    price.formattedValue = formatCurrency(
      price.value,
      availableLocale,
      currencySymbol,
      price.currencyIso
    );
  }

  /**
   * Converts the CPQ Attribute data type into the Configurator Attribute data type
   *
   * @param {Cpq.Attribute} cpqAttribute - CPQ Attribute
   * @returns {Configurator.DataType} Data type of the configurator attribute
   */
  convertDataType(cpqAttribute: Cpq.Attribute): Configurator.DataType {
    let dataType: Configurator.DataType;
    switch (cpqAttribute.dataType) {
      case Cpq.DataType.INPUT_STRING: {
        dataType = Configurator.DataType.INPUT_STRING;
        break;
      }
      case Cpq.DataType.INPUT_NUMBER: {
        dataType = Configurator.DataType.INPUT_NUMBER;
        break;
      }
      case Cpq.DataType.N_A: {
        dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
        break;
      }
      case Cpq.DataType.QTY_ATTRIBUTE_LEVEL: {
        dataType = Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
        break;
      }
      case Cpq.DataType.QTY_VALUE_LEVEL: {
        if (
          cpqAttribute.displayAs === Cpq.DisplayAs.RADIO_BUTTON ||
          cpqAttribute.displayAs === Cpq.DisplayAs.DROPDOWN
        ) {
          dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
        } else if (
          cpqAttribute.displayAs === Cpq.DisplayAs.CHECK_BOX &&
          !cpqAttribute.isLineItem
        ) {
          dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
        } else {
          dataType = Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL;
        }
        break;
      }
      default: {
        dataType = Configurator.DataType.NOT_IMPLEMENTED;
      }
    }
    return dataType;
  }

  /**
   * Converts price summary
   *
   * @param {cpqConfiguration: Cpq.Configuration} cpqConfiguration - CPQ configuration
   * @returns {Configurator.PriceSummary} - price summary
   */
  convertPriceSummary(
    cpqConfiguration: Cpq.Configuration
  ): Configurator.PriceSummary {
    const priceSummary: Configurator.PriceSummary = {};
    if (cpqConfiguration.currencyISOCode) {
      const currency: string = cpqConfiguration.currencyISOCode;
      if (
        cpqConfiguration?.responder?.totalPrice &&
        cpqConfiguration?.currencySign
      ) {
        const currencySign: string = cpqConfiguration?.currencySign;
        const totalPriceAsString: string =
          cpqConfiguration.responder.totalPrice.replace(currencySign, '');
        const totalPrice: Configurator.PriceDetails = {
          currencyIso: currency,
          value: parseFloat(totalPriceAsString),
        };
        this.formatPriceForLocale(totalPrice, this.getLanguage());
        priceSummary.currentTotal = totalPrice;
      }
      if (cpqConfiguration?.responder?.baseProductPrice) {
        const basePriceAsString: string =
          cpqConfiguration.responder.baseProductPrice;
        const basePrice: Configurator.PriceDetails = {
          currencyIso: currency,
          value: parseFloat(basePriceAsString),
        };
        this.formatPriceForLocale(basePrice, this.getLanguage());
        priceSummary.basePrice = basePrice;
      }
      if (priceSummary.currentTotal && priceSummary.basePrice) {
        const selectedOptionsPrice: Configurator.PriceDetails = {
          currencyIso: currency,
          value: priceSummary.currentTotal.value - priceSummary.basePrice.value,
        };
        this.formatPriceForLocale(selectedOptionsPrice, this.getLanguage());
        priceSummary.selectedOptions = selectedOptionsPrice;
      }
    }
    return priceSummary;
  }

  /**
   * Verifies whether at least one value of a CPQ Attribute has an assigned product
   *
   * @param {Cpq.Value[]} attributeValues - CPQ Attribute values
   * @returns {boolean} - true, if at least one value of a CPQ Attribute has an assigned product
   */
  hasAnyProducts(attributeValues: Cpq.Value[]): boolean {
    return attributeValues.some((value: Cpq.Value) => value?.productSystemId);
  }

  /**
   * Convert attribute label
   *
   * @param {attribute: Cpq.Attribute} attribute - CPQ Attribute
   * @returns {string} - attribute label
   */
  convertAttributeLabel(attribute: Cpq.Attribute): string {
    return attribute.label
      ? attribute.label
      : attribute.name
      ? attribute.name
      : '';
  }

  /**
   * Gets the current language.
   *
   * @return {string} - current language
   */
  protected getLanguage(): string {
    const lang = this.getActiveLanguage();
    try {
      getLocaleId(lang);
      return lang;
    } catch {
      this.reportMissingLocaleData(lang);
      return 'en';
    }
  }

  /**
   * Gets the active language.
   *
   * @return {string} - active language
   */
  protected getActiveLanguage(): string {
    let result;
    this.languageService
      .getActive()
      .subscribe((lang) => (result = lang))
      .unsubscribe();

    return result ?? 'en';
  }

  /**
   * Logs the message for the missing local data.
   *
   * @param {string} lang - Active language
   */
  protected reportMissingLocaleData(lang: string): void {
    if (isDevMode()) {
      console.warn(
        `CpqConfiguratorNormalizerUtilsService: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}
