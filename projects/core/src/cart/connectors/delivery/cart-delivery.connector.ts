import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Address, DeliveryModeList } from '../../../occ/occ-models/occ.models';
import { CartDeliveryAdapter } from './cart-delivery.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartDeliveryConnector {
  constructor(private adapter: CartDeliveryAdapter) {}

  public create(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address> {
    return this.adapter.create(userId, cartId, address);
  }

  public setDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any> {
    return this.adapter.setDeliveryAddress(userId, cartId, addressId);
  }

  public setDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any> {
    return this.adapter.setDeliveryMode(userId, cartId, deliveryModeId);
  }

  public getDeliveryMode(userId: string, cartId: string): Observable<any> {
    return this.adapter.getDeliveryMode(userId, cartId);
  }

  public getSupportedDeliveryModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryModeList> {
    return this.adapter.getSupportedDeliveryModes(userId, cartId);
  }
}
