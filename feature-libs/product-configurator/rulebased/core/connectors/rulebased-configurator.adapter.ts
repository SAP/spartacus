import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';

export abstract class RulebasedConfiguratorAdapter {
  /**
   * Abstract method used to create a configuration
   *
   * @param productCode Root product code
   */
  abstract createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to read a configuration.
   * If groupId is filled only the attributes of the requested group are returned.
   * For other groups the attributes list will be empty.
   *
   * @param configId configuration id
   * @param groupId group id
   */
  abstract readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to update a configuration
   *
   * @param configuration updated configuration object
   */
  abstract updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to add a configuration to cart.
   *
   * @param parameters add to cart parameters object
   */
  abstract addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification>;

  /**
   * Abstract method to read a configuration for a cart entry
   *
   * @param parameters read from cart entry parameters object
   */
  abstract readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to update a configuration attached to a cart entry
   *
   * @param parameters update cart entry configuration parameters object
   */
  abstract updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification>;

  /**
   * Abstract method to read a configuration for an order entry
   *
   * @param parameters Contains attributes that we need to read a configuration attached to an order entry
   * @returns  {Observable<Configurator.Configuration>} Configuration with only the overview aspect provided
   */
  abstract readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to read a configuration price
   *
   * @param configId configuration id
   */
  abstract readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to get configuration overview
   *
   * @param configId configuration id
   * @param owner configuration owner
   */
  abstract getConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview>;

  /**
   * Abstract method to get configuration overview
   *
   * @param configId configuration id
   * @param owner configuration owner
   */
  abstract getConfiguratorType(): string;
}
