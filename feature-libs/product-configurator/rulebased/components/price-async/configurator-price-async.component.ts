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
import { useFeatureStyles } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, switchMap } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceService } from '../price/configurator-price.component.service';

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

  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected configRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );
  protected priceService = inject(ConfiguratorPriceService);

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
    return this.priceService.compileFormattedValue(
      priceDetails.value,
      priceDetails.formattedValue
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
