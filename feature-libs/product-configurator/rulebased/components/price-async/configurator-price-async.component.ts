/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, switchMap } from 'rxjs';

export interface ConfiguratorPriceAsyncComponentOptions {
  attributeKey: string;
  valueName?: string;
  isLightedUp?: boolean;
}

@Component({
  selector: 'cx-configurator-price-async',
  templateUrl: './configurator-price-async.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceAsyncComponent {
  @Input() options: ConfiguratorPriceAsyncComponentOptions;

  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) => {
        return this.configuratorCommonsService.getConfiguration(
          routerData.owner
        );
      })
    );

  constructor(
    protected directionService: DirectionService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
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
  getPrice(configuration: Configurator.Configuration): string {
    console.log(this.options);
    let attribute = configuration.groups
      .find(
        // find active group
        (group) => group.attributes && group.attributes.length > 0
      )
      ?.attributes?.find(
        (attribute) => attribute.key === this.options.attributeKey
      );

    console.log(attribute);
    let price = attribute?.attributePriceTotal;

    if (this.options.valueName) {
      let value = attribute?.values?.find(
        (value) => value.name === this.options.valueName
      );
      price = value?.valuePrice;
    }
    console.log(price);

    return this.compileFormattedValue(
      price?.value ?? 0,
      price?.formattedValue,
      this.isRTLDirection()
    );
  }

  /**
   * Verifies whether the price is lighted up.
   *
   * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
   */
  isPriceLightedUp(): boolean {
    return this.options.isLightedUp ?? false;
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
