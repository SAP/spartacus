import { Observable } from 'rxjs';
import { Address } from '../../../occ/occ-models/occ.models';

export abstract class CartDeliveryAdapter {
  abstract createAddress(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address>;

  abstract setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any>;
  abstract setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any>;
  abstract getMode(userId: string, cartId: string): Observable<any>;
  abstract getSupportedModes(userId: string, cartId: string);
}
