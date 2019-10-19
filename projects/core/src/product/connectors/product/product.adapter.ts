import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductWithScope } from './product-with-scope';

export abstract class ProductAdapter {
  /**
   * Abstract method used to load product's details data.
   * Product's data can be loaded from alternative sources, as long as the structure
   * converts to the `Product`.
   *
   * @param productCode The `productCode` for given product
   * @param scope The product scope to load
   */
  abstract load(productCode: string, scope?: string): Observable<Product>;

  /**
   * Abstract method used to load data for multiple product and scopes
   * Adapter is sable to optimize necessary backend calls and load
   * products in mose efficient way possible.
   *
   * @param products
   */
  abstract loadMany?(products: ProductWithScope[]): ProductWithScope[];
}
