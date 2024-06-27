/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useFeatureStyles } from '@spartacus/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceService } from './configurator-price.component.service';

export interface ConfiguratorPriceComponentOptions {
  quantity?: number;
  price?: Configurator.PriceDetails;
  priceTotal?: Configurator.PriceDetails;
  isLightedUp?: boolean;
}

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;

  protected priceService = inject(ConfiguratorPriceService);

  constructor(
    /**
     * @deprecated since 2211.26 / 2408 Use ConfiguratorPriceService
     */
    protected directionService: DirectionService
  ) {
    useFeatureStyles('productConfiguratorAttributeTypesV2');
  }

  /**
   * @deprecated since 2211.26 / 2408 Use ConfiguratorPriceService
   */
  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  /**
   * @deprecated since 2211.26 / 2408 - Use ConfiguratorPriceService.removeSign() instead
   */
  protected removeSign(value: string | undefined, sign: string): string {
    return this.priceService.removeSign(value, sign);
  }

  /**
   * @deprecated since 2211.26 / 2408 - Use ConfiguratorPriceService.addSign() instead
   */
  protected addSign(
    value: string | undefined,
    sign: string,
    _before: boolean
  ): string {
    return this.priceService.addSign(value, sign);
  }

  /**
   * @deprecated since 2211.26 / 2408 - Use ConfiguratorPriceService.compileFormattedValue() instead
   */
  protected compileFormattedValue(
    priceValue: number,
    formattedValue: string | undefined,
    _isRTL: boolean
  ): string {
    return this.priceService.compileFormattedValue(priceValue, formattedValue);
  }

  /**
   * Retrieves price.
   *
   * @return {string} - value price formula
   */
  get price(): string {
    if (this.formula.priceTotal) {
      return this.priceTotal;
    } else {
      return this.priceService.compileFormattedValue(
        this.formula.price?.value ?? 0,
        this.formula.price?.formattedValue
      );
    }
  }

  /**
   * Retrieves the total price.
   *
   * @return {string} - total price formula
   */
  get priceTotal(): string {
    return this.priceService.compileFormattedValue(
      this.formula.priceTotal?.value ?? 0,
      this.formula.priceTotal?.formattedValue
    );
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
      (priceValue !== 0 || priceTotalValue !== 0) &&
      !this.displayQuantityAndPrice()
    );
  }

  /**
   * Verifies whether the price formula should be displayed.
   *
   * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
   */
  displayFormula(): boolean {
    const displayFormula =
      (this.formula.quantity && this.formula.quantity !== 0) ||
      (this.formula.price && this.formula.price?.value !== 0) ||
      (this.formula.priceTotal && this.formula.priceTotal?.value !== 0);
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
