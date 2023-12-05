import { CartModification } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartEntryAdapter } from './cart-entry.adapter';
import * as i0 from "@angular/core";
export declare class CartEntryConnector {
    protected adapter: CartEntryAdapter;
    constructor(adapter: CartEntryAdapter);
    add(userId: string, cartId: string, productCode: string, quantity?: number, pickupStore?: string): Observable<CartModification>;
    update(userId: string, cartId: string, entryNumber: string, qty?: number, pickupStore?: string, pickupToDelivery?: boolean): Observable<CartModification>;
    remove(userId: string, cartId: string, entryNumber: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartEntryConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartEntryConnector>;
}
