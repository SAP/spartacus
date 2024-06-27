/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Observable, switchMap } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';
import { useFeatureStyles } from '@spartacus/core';

const NO_PRICE: Configurator.PriceDetails = { value: 0, currencyIso: '' };

export interface ConfiguratorPriceAsyncComponentOptions {
  attributeKey: string;
  valueName?: string;
  isLightedUp?: boolean;
}

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price-async.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceAsyncComponent {
  @Input() options: ConfiguratorPriceAsyncComponentOptions;

  protected directionService = inject(DirectionService);
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected configRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );

  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) => {
        return this.configuratorCommonsService.getConfiguration(
          routerData.owner
        );
      })
    );

  constructor() {
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

  getPriceDetails(
    configuration: Configurator.Configuration
  ): Configurator.PriceDetails {
    const priceSupplement = configuration.priceSupplements
      ?.find(
        (attrSupplement) =>
          attrSupplement.attributeUiKey === this.options.attributeKey
      )
      ?.valueSupplements.find(
        (valueSupplement) =>
          valueSupplement.attributeValueKey === this.options.valueName
      );
    return priceSupplement?.priceValue ?? NO_PRICE;
  }

  getDisplayPrice(priceDetails: Configurator.PriceDetails): string {
    return this.compileFormattedValue(
      priceDetails.value,
      priceDetails.formattedValue,
      this.isRTLDirection()
    );
  }

  displayPrice(priceDetails: Configurator.PriceDetails): boolean {
    return priceDetails.value !== 0;
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
