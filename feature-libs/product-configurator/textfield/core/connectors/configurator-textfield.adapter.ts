import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';

export abstract class ConfiguratorTextfieldAdapter {
  /**
   * Abstract method used to create a default configuration based on product code
   * and owner
   *
   * @param productCode Root product code
   * @param owner Configuration owner
   * @returns Observable of configurations
   */
  abstract createConfiguration(
    productCode: string,
    owner: CommonConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration>;

  /**
   * Abstract method to add a configuration to cart, based on a product, a configuration,
   * and other attributes part of parameters
   *
   * @param parameters add to cart parameters object
   * @returns Observable of cart modifications
   */
  abstract addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification>;

  /**
   * Abstract method to read a configuration for a cart entry
   *
   * @param parameters read from cart entry parameters object
   * @returns Observable of configurations
   */
  abstract readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration>;

  /**
   * Abstract method to read a configuration for an order entry
   *
   * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters read from order entry parameters object
   * @returns {Observable<ConfiguratorTextfield.Configuration>} Observable of configurations
   */
  abstract readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration>;

  /**
   * Abstract method to update a configuration attached to a cart entry
   *
   * @param parameters contains attributes needed to update the cart entries' configuration
   * @returns Observable of cart modifications
   */
  abstract updateConfigurationForCartEntry(
    parameters: ConfiguratorTextfield.UpdateCartEntryParameters
  ): Observable<CartModification>;
}
