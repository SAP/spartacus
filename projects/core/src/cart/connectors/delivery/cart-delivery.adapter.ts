import { Observable } from 'rxjs';

export abstract class CartDeliveryAdapter {
  // address
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
