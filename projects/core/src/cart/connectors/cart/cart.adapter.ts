import { Observable } from 'rxjs';
import {
  Cart,
  CartList,
  CartModification,
  PaymentDetails,
} from '../../../occ/occ-models/occ.models';

export abstract class CartAdapter {
  // cart
  abstract loadAllCarts(userId: string, details: boolean): Observable<CartList>;
  abstract loadAllCarts(
    userId: string,
    details?: boolean
  ): Observable<CartList>;
  abstract loadCart(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart>;
  abstract createCart(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart>;

  // entires
  abstract addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  abstract updateEntry(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification>;
  abstract removeEntry(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any>;

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

  // Payment
  abstract getPaymentProviderSubInfo(userId: string, cartId: string);
  abstract createSubWithPaymentProvider(
    postUrl: string,
    parameters: any
  ): Observable<any>;
  abstract createPaymentDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails>;
  abstract setPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  );
}
