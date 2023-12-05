import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDeliveryAddressAdapter } from './checkout-delivery-address.adapter';
import * as i0 from "@angular/core";
export declare class CheckoutDeliveryAddressConnector {
    protected adapter: CheckoutDeliveryAddressAdapter;
    constructor(adapter: CheckoutDeliveryAddressAdapter);
    createAddress(userId: string, cartId: string, address: Address): Observable<Address>;
    setAddress(userId: string, cartId: string, addressId: string): Observable<unknown>;
    clearCheckoutDeliveryAddress(userId: string, cartId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryAddressConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryAddressConnector>;
}
