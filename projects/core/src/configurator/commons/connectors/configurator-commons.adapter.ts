import { Observable } from 'rxjs';
import { Configurator } from '../../../model/configurator.model';

export abstract class ConfiguratorCommonsAdapter {
  /**
   * Abstract method used to create a configuration
   *
   * @param productCode Root product code
   */
  abstract createConfiguration(
    productCode: string
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
    groupId: string
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
   * Abstract method to read a configuration price
   *
   * @param configId configuration id
   */
  abstract readPriceSummary(
    configId: string
  ): Observable<Configurator.Configuration>;
}
