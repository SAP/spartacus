/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceService } from '../price/configurator-price.component.service';

const NO_PRICE: Configurator.PriceDetails = {
  currencyIso: '',
  formattedValue: '-',
  value: 0,
};

export interface ConfiguratorPriceAsyncComponentOptions {
  attributeKey: string;
  valueName: string;
  isLightedUp?: boolean;
}

export interface ConfiguratorValuePriceChanged {
  source: ConfiguratorPriceAsyncComponentOptions;
  valuePrice: Configurator.PriceDetails;
}

@Component({
  selector: 'cx-configurator-price-async',
  templateUrl: './configurator-price-async.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceAsyncComponent {
  @Input() options: ConfiguratorPriceAsyncComponentOptions;
  @Output() priceChanged = new EventEmitter<ConfiguratorValuePriceChanged>();

  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected configuratorRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );
  protected configuratorPriceService = inject(ConfiguratorPriceService);

  protected lastValuePrice = NO_PRICE;

  configuration$: Observable<Configurator.Configuration> =
    this.configuratorRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) => {
        return this.configuratorCommonsService
          .getConfiguration(routerData.owner)
          .pipe(filter((config) => !!config.priceSupplements))
          .pipe(
            tap((config) => {
              const valuePrice = this.findValuePrice(config);
              const lastValuePrice = this.lastValuePrice;
              if (this.isValuePriceChanged(lastValuePrice, valuePrice)) {
                this.priceChanged.emit({
                  source: this.options,
                  valuePrice: valuePrice,
                });
                this.lastValuePrice = valuePrice;
              }
            })
          );
      })
    );

  constructor() {
    useFeatureStyles('productConfiguratorAttributeTypesV2');
  }

  protected isValuePriceChanged(
    lastValuePrice: Configurator.PriceDetails,
    valuePrice: Configurator.PriceDetails
  ): boolean {
    return (
      lastValuePrice.value !== valuePrice.value ||
      lastValuePrice.currencyIso !== valuePrice.currencyIso ||
      lastValuePrice.formattedValue !== valuePrice.formattedValue
    );
  }

  /**
   * Searches the configuration for a value price supplement matching the attribute key
   * and value name bound as input data to this component.
   *
   * @param configuration configuration containing price supplements
   * @returns price details
   */
  findValuePrice(
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

  /**
   * returns a formatted price string to be displayed on the UI
   *
   * @param priceDetails price details
   * @returns formatted price
   */
  getDisplayPrice(priceDetails: Configurator.PriceDetails): string {
    return this.configuratorPriceService.compileFormattedValue(
      priceDetails.value,
      priceDetails.formattedValue
    );
  }

  /**
   * Checks if the price should be displayed on the UI.
   *
   * @param priceDetails price details
   * @returns {true}, only if the price shall be displayed
   */
  displayPrice(priceDetails: Configurator.PriceDetails): boolean {
    return priceDetails.value !== 0;
  }

  /**
   * Verifies whether the price is lighted up.
   *
   * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
   */
  protected isPriceLightedUp(): boolean {
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
