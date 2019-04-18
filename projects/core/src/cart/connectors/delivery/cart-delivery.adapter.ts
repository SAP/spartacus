import { Observable } from 'rxjs';
import { Address } from '../../../occ/occ-models/occ.models';

export abstract class CartDeliveryAdapter {
  abstract create(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address>;

  abstract setDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any>;
  abstract setDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any>;
  abstract getDeliveryMode(userId: string, cartId: string): Observable<any>;
  abstract getSupportedDeliveryModes(userId: string, cartId: string);
}
