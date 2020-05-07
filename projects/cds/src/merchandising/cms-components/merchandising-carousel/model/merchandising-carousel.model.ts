import { Observable } from 'rxjs';
import { MerchandisingProduct } from '../../../model/merchandising-products.model';

export interface MerchandisingCarouselModel {
  items$: Observable<MerchandisingProduct>[];
  metadata: Map<string, string>;
  title: string;
  backgroundColor: string | Object | undefined;
  textColor: string | Object | undefined;
}
