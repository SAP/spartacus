import { Observable } from 'rxjs';
import { Product } from '../../../occ/occ-models/occ.models';

export abstract class ProductAdapter {
  abstract load(productCode: string): Observable<Product>;
}
