import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';

@Injectable()
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
    owner: CommonConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.createConfiguration(productCode, owner);
  }
  /**
   * Reads an existing configuration for a cart entry
   * @param parameters Attributes needed to read a product configuration for a cart entry
   * @returns Observable of product configurations
   */
  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.readConfigurationForCartEntry(parameters);
  }
  /**
   * Reads an existing configuration for an order entry
   * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters Attributes needed to read a product configuration for an order entry
   * @returns {Observable<ConfiguratorTextfield.Configuration>} Observable of product configurations
   */
  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.readConfigurationForOrderEntry(parameters);
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
