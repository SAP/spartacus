import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';

/**
 * Used in product connectors and adapter to load multiple product codes and scopes
 */
export interface ProductWithScope {
  code: string,
  scope: string,
  data$?: Observable<Product>
}
