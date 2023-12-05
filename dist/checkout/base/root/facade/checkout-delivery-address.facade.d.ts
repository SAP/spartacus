import { Address, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class CheckoutDeliveryAddressFacade {
    /**
     * Returns the delivery address state
     */
    abstract getDeliveryAddressState(): Observable<QueryState<Address | undefined>>;
    /**
     * Creates and sets the delivery address using the provided address
     */
    abstract createAndSetAddress(address: Address): Observable<unknown>;
    /**
     * Sets the delivery address to the cart
     */
    abstract setDeliveryAddress(address: Address): Observable<unknown>;
    /**
     * Clears the delivery address set in the cart
     */
    abstract clearCheckoutDeliveryAddress(): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryAddressFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryAddressFacade>;
}
