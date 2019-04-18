import { Observable } from 'rxjs';
import { Address } from '../../../occ/occ-models/occ.models';

export abstract class CartAddressAdapter {
  abstract createAddressOnCart(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address>;
}
