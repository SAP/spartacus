import { Observable } from 'rxjs';
import { ProductConfiguration } from '../../../model/configurator.model';

export abstract class ConfiguratorCommonsAdapter {
  /**
   * Abstract method used to create a configuration
   *
   * @param productCode Root product code
   */
  abstract createConfiguration(
    productCode: string
  ): Observable<ProductConfiguration>;
}
