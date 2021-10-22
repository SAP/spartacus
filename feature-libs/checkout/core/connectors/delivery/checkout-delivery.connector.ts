import { Injectable } from '@angular/core';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDeliveryAdapter } from './checkout-delivery.adapter';

@Injectable()
export class CheckoutDeliveryConnector {
  constructor(protected adapter: CheckoutDeliveryAdapter) {}

  public createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    return this.adapter.createAddress(userId, cartId, address);
  }

  public setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<unknown> {
    return this.adapter.setAddress(userId, cartId, addressId);
  }

  public clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<unknown> {
    return this.adapter.clearCheckoutDeliveryAddress(userId, cartId);
  }
}
