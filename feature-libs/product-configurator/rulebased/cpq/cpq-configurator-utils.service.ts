import { Injectable, isDevMode } from '@angular/core';
import { getLocaleId } from '@angular/common';
import { Configurator } from '../core/model/configurator.model';
import { Cpq } from './cpq.models';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { LanguageService } from '@spartacus/core';
import { take } from 'rxjs/operators';

/**
 * Utilities for CPQ configuration
 */
@Injectable({ providedIn: 'root' })
export class CpqConfiguratorUtilsService {
  constructor(protected languageService: LanguageService) {}

  /**
   * Prepares quantity to be shown inthe overview page
   * @param value CPQ Value
   * @param attribute CPQ Attribute
   * @returns Quantity
   */
  prepareQuantity(value: Cpq.Value, attribute: Cpq.Attribute): number {
    if (!value.selected) {
      return null;
    }
    const configuratorDataType: Configurator.DataType = this.convertDataType(
      attribute
    );
    let quantity: number;
    switch (configuratorDataType) {
      case Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL:
        quantity = Number(attribute.quantity);
        break;
      case Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL:
        quantity = Number(value.quantity);
        break;
      default:
        quantity = null;
    }
    return quantity;
  }

  /**
   * Prepares value price
   * @param value CPQ Value
   * @param currency Currency code ISO
   * @returns PriceDetails
   */
  prepareValuePrice(
    value: Cpq.Value,
    currency: string
  ): Configurator.PriceDetails {
    let price: Configurator.PriceDetails = null;
    if (value.price) {
      price = {
        currencyIso: currency,
        value: parseFloat(value.price),
      };
      this.formatPrice(price);
    }
    return price;
  }

  /**
   * Calculates total value price
   * @param quantity Quantity
   * @param valuePrice PriceDetails of the single value price
   * @returns PriceDetails for total value price
   */
  calculateValuePriceTotal(
    quantity: number,
    valuePrice: Configurator.PriceDetails
  ): Configurator.PriceDetails {
    let valuePriceTotal: Configurator.PriceDetails = null;
    if (valuePrice) {
      const calculationQuantity: number = quantity ? quantity : 1;
      valuePriceTotal = {
        currencyIso: valuePrice.currencyIso,
        value: calculationQuantity * valuePrice.value,
      };
      this.formatPrice(valuePriceTotal);
    }
    return valuePriceTotal;
  }

  /**
   * Calculates total attribute price
   * @param attribute Configurator Attribute
   * @returns PriceDetails for total attribute price
   */
  calculateAttributePriceTotal(
    attribute: Configurator.Attribute,
    currency: string
  ): Configurator.PriceDetails {
    const priceTotal: number = attribute.values
      .filter((entry) => entry.selected && entry.valuePriceTotal)
      .reduce((total, item) => total + item.valuePriceTotal.value, 0);
    const attributePriceTotal: Configurator.PriceDetails = {
      currencyIso: currency,
      value: priceTotal,
    };
    this.formatPrice(attributePriceTotal);
    return attributePriceTotal;
  }

  /**
   * Prepares formatted price for given PriceDetails object
   * @param price Price details
   */
  protected formatPrice(price: Configurator.PriceDetails): void {
    this.languageService
      .getActive()
      .pipe(take(1))
      .subscribe((locale) => {
        this.formatPriceForLocale(price, locale);
      });
  }

  /**
   * Prepares formatted price for given PriceDetails object and Locale
   * @param price Price details
   * @param desiredLocale Original locale
   */
  protected formatPriceForLocale(
    price: Configurator.PriceDetails,
    desiredLocale: string
  ): void {
    let availableLocale: string;
    try {
      availableLocale = getLocaleId(desiredLocale);
    } catch {
      if (isDevMode()) {
        console.warn(
          `CpqConfiguratorUtilitiesService: No locale data registered for '${desiredLocale}' (see https://angular.io/api/common/registerLocaleData).`
        );
      }
      availableLocale = 'en';
    }
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
   * @param cpqAttribute CPQ Attribute
   * @returns Data type of the configurator attribute
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

  preparePriceSummary(
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
        const totalPriceAsString: string = cpqConfiguration.responder.totalPrice.replace(
          currencySign,
          ''
        );
        const totalPrice: Configurator.PriceDetails = {
          currencyIso: currency,
          value: parseFloat(totalPriceAsString),
        };
        this.formatPrice(totalPrice);
        priceSummary.currentTotal = totalPrice;
      }
      if (cpqConfiguration?.responder?.baseProductPrice) {
        const basePriceAsString: string =
          cpqConfiguration.responder.baseProductPrice;
        const basePrice: Configurator.PriceDetails = {
          currencyIso: currency,
          value: parseFloat(basePriceAsString),
        };
        this.formatPrice(basePrice);
        priceSummary.basePrice = basePrice;
      }
      if (priceSummary.currentTotal?.value && priceSummary.basePrice?.value) {
        const selectedOptionsPrice: Configurator.PriceDetails = {
          currencyIso: currency,
          value: priceSummary.currentTotal.value - priceSummary.basePrice.value,
        };
        this.formatPrice(selectedOptionsPrice);
        priceSummary.selectedOptions = selectedOptionsPrice;
      }
    }
    return priceSummary;
  }

  /**
   * Verifies whether at least one value of a CPQ Attribute has an assigned product
   * @param attributeValues CPQ Attribute values
   * @returns true, if at least one value of a CPQ Attribute has an assigned product
   */
  hasAnyProducts(attributeValues: Cpq.Value[]): boolean {
    return attributeValues.some((value: Cpq.Value) => value?.productSystemId);
  }

  /**
   * Retrieve attribute label
   * @param attribute CPQ Attribute
   * @returns attribute label
   */
  retrieveAttributeLabel(attribute: Cpq.Attribute): string {
    return attribute.label
      ? attribute.label
      : attribute.name
      ? attribute.name
      : '';
  }
}
