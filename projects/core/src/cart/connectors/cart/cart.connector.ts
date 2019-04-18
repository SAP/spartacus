import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Cart,
  CartList,
  CartModification,
  DeliveryModeList,
  PaymentDetails,
} from '../../../occ/occ-models/occ.models';
import { CartAdapter } from './cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartConnector {
  constructor(private adapter: CartAdapter) {}

  public loadAllCarts(userId: string, details?: boolean): Observable<CartList> {
    return this.adapter.loadAllCarts(userId, details);
  }

  public loadCart(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart> {
    return this.adapter.loadCart(userId, cartId, details);
  }

  public createCart(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    return this.adapter.createCart(userId, oldCartId, toMergeCartGuid);
  }

  public addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification> {
    return this.adapter.addEntry(userId, cartId, productCode, quantity);
  }

  public updateEntry(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    return this.adapter.updateEntry(
      userId,
      cartId,
      entryNumber,
      qty,
      pickupStore
    );
  }

  public removeEntry(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    return this.adapter.removeEntry(userId, cartId, entryNumber);
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

  public getPaymentProviderSubInfo(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.adapter.getPaymentProviderSubInfo(userId, cartId);
  }

  public createSubWithPaymentProvider(
    postUrl: string,
    parameters: any
  ): Observable<any> {
    return this.adapter.createSubWithPaymentProvider(postUrl, parameters);
  }

  public createPaymentDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails> {
    return this.adapter.createPaymentDetails(userId, cartId, parameters);
  }

  public setPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  ): Observable<any> {
    return this.adapter.setPaymentDetails(userId, cartId, paymentDetailsId);
  }
}
