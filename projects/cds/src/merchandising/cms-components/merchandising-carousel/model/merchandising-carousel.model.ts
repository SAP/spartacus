import { Observable } from 'rxjs';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
} from '../../../model/index';

export interface MerchandisingCarouselModel {
  items$: Observable<MerchandisingProduct>[];
  productIds: string [];
  metadata: MerchandisingMetadata;
  title: string;
  backgroundColor: string | Object | undefined;
  textColor: string | Object | undefined;
}
