import { Observable } from 'rxjs';
import { MerchandisingMetadata, MerchandisingProduct } from '../../../model';

export interface MerchandisingCarouselModel {
  items$: Observable<MerchandisingProduct>[];
  metadata: MerchandisingMetadata;
  title: string;
  backgroundColor: string | Object | undefined;
  textColor: string | Object | undefined;
}
