/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';

export interface ConfiguratorPriceComponentOptions {
  quantity?: number;
  price?: Configurator.PriceDetails;
  priceTotal?: Configurator.PriceDetails;
  isLightedUp?: boolean;
  isOverview?: boolean;
}

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;

  /**
   * Retrieves price.
   *
   * @return {string} - value price formula
   */
  get price(): string {
    if (this.formula.priceTotal) {
      return this.priceTotal;
    } else {
      if (this.formula.price?.value) {
        if (this.formula.price?.value > 0) {
          return '+' + this.formula.price?.formattedValue;
        } else if (this.formula.price?.value < 0) {
          return this.formula.price?.formattedValue || '';
        }
      }
      return '';
    }
  }

  /**
   * Retrieves the total price.
   *
   * @return {string} - total price formula
   */
  get priceTotal(): string {
    if (this.formula.priceTotal && this.formula.priceTotal.value >= 0) {
      return '+' + this.formula.priceTotal?.formattedValue;
    } else {
      return this.formula.priceTotal?.formattedValue || '';
    }
  }

  /**
   * Verifies whether quantity with price should be displayed.
   *
   * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
   */
  displayQuantityAndPrice(): boolean {
    const quantity = this.formula.quantity;
    return quantity ? this.formula.price?.value !== 0 && quantity >= 1 : false;
  }

  /**
   * Verifies whether only price should be displayed.
   *
   * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
   */
  displayPriceOnly(): boolean {
    const priceValue = this.formula.price?.value ?? 0;
    const priceTotalValue = this.formula.priceTotal?.value ?? 0;
    return (
      ((priceValue !== 0 || priceTotalValue !== 0) &&
        !this.displayQuantityAndPrice()) ||
      this.isOverview()
    );
  }

  /**
   * Verifies whether the price formula should be displayed.
   *
   * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
   */
  displayFormula(): boolean {
    const displayFormula =
      this.formula.quantity !== undefined ||
      this.formula.price !== undefined ||
      this.formula.priceTotal !== undefined;
    return displayFormula ?? false;
  }

  /**
   * Retrieves formula for quantity with price.
   *
   * @param {string} formattedQuantity- formatted quantity
   * @return {string} - price formula
   */
  quantityWithPrice(formattedQuantity: string | null): string {
    return formattedQuantity + 'x(' + this.formula.price?.formattedValue + ')';
  }

  /**
   * Verifies whether the price is lighted up.
   *
   * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
   */
  isPriceLightedUp(): boolean {
    return this.formula.isLightedUp ?? false;
  }

  isOverview(): boolean {
    return this.formula.isOverview ?? false;
  }

  /**
   * Retrieves the styling for the corresponding element.
   *
   * @return {string} - corresponding style class
   */
  get styleClass(): string {
    let styleClass = 'cx-price';
    if (!this.isPriceLightedUp()) {
      styleClass += ' cx-greyed-out';
    }

    return styleClass;
  }
}
