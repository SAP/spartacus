import { CartModification, GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';

export abstract class ConfiguratorTextfieldAdapter {
  /**
   * Abstract method used to create a configuration
   *
   * @param productCode Root product code
   */
  abstract createConfiguration(
    productCode: string,
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration>;

  /**
   * Abstract method to add a configuration to cart.
   *
   * @param parameters add to cart parameters object
   */
  abstract addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification>;

  /**
   * Abstract method to read a configuration for a cart entry
   *
   * @param parameters read from cart entry parameters object
   */
  abstract readConfigurationForCartEntry(
    parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration>;

  /**
   * Abstract method to update a configuration for a cart entry
   *
   * @param parameters contains attributes needed to update the cart entries' configuration
   */
  abstract updateConfigurationForCartEntry(
    parameters: ConfiguratorTextfield.UpdateCartEntryParameters
  ): Observable<CartModification>;
}
