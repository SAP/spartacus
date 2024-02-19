import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class OpfCartHandlerInterface {
  abstract addProductToCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean>;
  abstract checkStableCart(): Observable<boolean>;
  abstract getSupportedDeliveryModes(): Observable<DeliveryMode[]>;
  abstract setDeliveryAddress(address: Address): Observable<string>;
  abstract setBillingAddress(address: Address): Observable<boolean>;
  abstract getDeliveryAddress(): Observable<Address | undefined>;
  abstract getCurrentCart(): Observable<Cart>;
  abstract getCurrentCartId(): Observable<string>;
  abstract getCurrentCartTotalPrice(): Observable<number | undefined>;
  abstract setDeliveryMode(mode: string): Observable<DeliveryMode | undefined>;
  abstract getSelectedDeliveryMode(): Observable<DeliveryMode | undefined>;
  abstract deleteUserAddresses(addrIds: string[]): void;
  abstract deleteCurrentCart(): Observable<boolean>;
}
