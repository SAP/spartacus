import { Observable } from 'rxjs';
import { MerchandisingProduct } from '../../../model/merchandising-products.model';

export interface MerchandisingCarouselModel {
  items$: Observable<MerchandisingProduct>[];
  metadata: Map<string, string>;
}
