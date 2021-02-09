import { Injectable } from '@angular/core';
import { Configurator } from '../model/configurator.model';

/**
 * Service for handling configuration price
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorPriceService {
  /**
   * Retrieves the price of the selected value.
   *
   * @param {Configurator.Attribute} attribute - attribute
   */
  getSelectedValuePrice(
    attribute: Configurator.Attribute
  ): Configurator.PriceDetails | undefined {
    return attribute?.values?.find((value) => value?.selected)?.valuePrice;
  }

  /**
   * Verifies whether all relevant price data are defined.
   *
   * @param {Configurator.Attribute} attribute - attribute
   */
  isPriceDataDefined(attribute: Configurator.Attribute): boolean {
    return (
      this.getSelectedValuePrice(attribute) !== undefined &&
      attribute?.attributePriceTotal !== undefined &&
      attribute?.quantity !== undefined
    );
  }
}
