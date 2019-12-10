import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';
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

  /**
   * Abstract method to add a configuration to cart.
   *
   * @param parameters add to cart parameters object
   */
  abstract addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification>;
}
