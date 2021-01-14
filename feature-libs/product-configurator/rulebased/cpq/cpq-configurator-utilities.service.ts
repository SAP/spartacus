import { Injectable } from '@angular/core';
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
export class CpqConfiguratorUtilitiesService {
  constructor(protected languageService: LanguageService) {}

  /**
   * Prepares quantity to be shown inthe overview page
   * @param value CPQ Value
   * @param attr CPQ Attribute
   * @returns Quantity
   */
  prepareQuantity(value: Cpq.Value, attr: Cpq.Attribute): number {
    let quantity: number;
    switch (attr.dataType) {
      case Cpq.DataType.QTY_ATTRIBUTE_LEVEL:
        quantity = Number(attr.quantity);
        break;
      case Cpq.DataType.QTY_VALUE_LEVEL:
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
   * Prepares formatted price for given PriceDetails object
   * @param price Price details
   */
  formatPrice(price: Configurator.PriceDetails): void {
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
   * @param originalLocale Original locale
   */
  formatPriceForLocale(
    price: Configurator.PriceDetails,
    originalLocale: string
  ): void {
    let locale: string;
    try {
      locale = getLocaleId(originalLocale);
    } catch {
      locale = 'en';
    }
    const currencySymbol: string = getCurrencySymbol(
      price.currencyIso,
      'narrow',
      locale
    );
    price.formattedValue = formatCurrency(
      price.value,
      locale,
      currencySymbol,
      price.currencyIso
    );
  }
}
