import { Observable } from 'rxjs';
import { Address, DeliveryMode } from '../../../occ/occ-models/occ.models';

export abstract class CartDeliveryAdapter {
  abstract createAddress(
    userId: string,
    cartId: string,
    address: Address
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
  abstract getMode(userId: string, cartId: string): Observable<DeliveryMode>;
  abstract getSupportedModes(userId: string, cartId: string): Observable<DeliveryMode[]>;
}
