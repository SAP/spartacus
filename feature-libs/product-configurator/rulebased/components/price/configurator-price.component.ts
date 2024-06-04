/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { Subscription, filter, switchMap } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';

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
export class ConfiguratorPriceComponent implements OnInit, OnDestroy {
  @Input() formula: ConfiguratorPriceComponentOptions;
  subscription: Subscription;

  constructor(
    protected directionService: DirectionService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected cdr: ChangeDetectorRef
  ) {
    useFeatureStyles('productConfiguratorAttributeTypesV2');
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  protected removeSign(value: string | undefined, sign: string): string {
    if (value) {
      return value.replace(sign, '');
    }
    return '';
  }

  protected addSign(
    value: string | undefined,
    sign: string,
    before: boolean
  ): string {
    if (value) {
      return before ? sign + value : value + sign;
    }
    return '';
  }

  protected compileFormattedValue(
    priceValue: number,
    formattedValue: string | undefined,
    isRTL: boolean
  ): string {
    if (priceValue > 0) {
      return this.addSign(formattedValue, '+', !isRTL);
    } else {
      if (isRTL) {
        const withoutSign = this.removeSign(formattedValue, '-');
        return this.addSign(withoutSign, '-', false);
      }
      return formattedValue ?? '';
    }
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
      return this.compileFormattedValue(
        this.formula.price?.value ?? 0,
        this.formula.price?.formattedValue,
        this.isRTLDirection()
      );
    }
  }

  /**
   * Retrieves the total price.
   *
   * @return {string} - total price formula
   */
  get priceTotal(): string {
    return this.compileFormattedValue(
      this.formula.priceTotal?.value ?? 0,
      this.formula.priceTotal?.formattedValue,
      this.isRTLDirection()
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

  ngOnInit() {
    this.cdr.detach();
    this.subscription = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) => {
          return this.configuratorCommonsService.getConfiguration(
            routerData.owner
          );
        })
      )
      .pipe(filter((config) => config.includesPrices === true))
      .subscribe(() => {
        // this is a dummy change, actually we would try to find the correct price data using the attribute and value key (which would need to passed in from parent instead of formula)
        this.formula.price = {
          value: 120.0,
          formattedValue: '$120,00',
          currencyIso: 'USD',
        };
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
