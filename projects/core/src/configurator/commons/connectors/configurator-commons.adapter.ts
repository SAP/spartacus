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
   * Abstract method to read a configuration
   *
   * @param configId configuration id
   */
  abstract readConfiguration(
    configId: string
  ): Observable<Configurator.Configuration>;

  /**
   * Abstract method to update a configuration
   *
   * @param configuration updated configuration object
   */
  abstract updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration>;
}
