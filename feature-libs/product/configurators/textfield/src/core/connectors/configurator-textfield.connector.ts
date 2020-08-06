import { Injectable } from '@angular/core';
import { CartModification, GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorTextfieldConnector {
  constructor(protected adapter: ConfiguratorTextfieldAdapter) {}

  /**
   * Creates default configuration for a product that is textfield-configurable
   * @param productCode Product code
   * @param owner Owner of the configuration
   * @returns Observable of product configurations
   */
  createConfiguration(
    productCode: string,
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.createConfiguration(productCode, owner);
  }
  /**
   * Reads an existing configuration for a cart entry
   * @param parameters Attributes needed to read a product configuration for a cart entry
   * @returns Observable of product configurations
   */
  readConfigurationForCartEntry(
    parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.readConfigurationForCartEntry(parameters);
  }
  /**
   * Updates a configuration that is attached to a cart entry
   * @param parameters Attributes needed to update a cart entries' configuration
   * @returns Observable of cart modifications
   */
  updateConfigurationForCartEntry(
    parameters: ConfiguratorTextfield.UpdateCartEntryParameters
  ): Observable<CartModification> {
    return this.adapter.updateConfigurationForCartEntry(parameters);
  }

  /**
   * Adds a textfield-configurable product to the cart, and passes along its configuration
   * @param parameters Attributes needed to add a textfield product along with its configuration to the cart
   * @returns Observable of cart modifications
   */
  addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification> {
    return this.adapter.addToCart(parameters);
  }
}
