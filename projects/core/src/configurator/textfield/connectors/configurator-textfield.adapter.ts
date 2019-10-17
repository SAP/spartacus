import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';

export abstract class ConfiguratorTextfieldAdapter {
  /**
   * Abstract method used to create a configuration
   *
   * @param productCode Root product code
   */
  abstract createConfiguration(
    productCode: string
  ): Observable<ConfiguratorTextfield.Configuration>;
}
