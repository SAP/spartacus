import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';

export abstract class ProductAdapter {
  /**
   * Abstract method used to load product's details data.
   * Product's data can be loaded from alternative sources, as long as the structure
   * converts to the `Product`.
   *
   * @param productCode The `productCode` for given product
   */
  abstract load(productCode: string): Observable<Product>;
}
