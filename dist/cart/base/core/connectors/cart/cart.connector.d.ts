import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartAdapter } from './cart.adapter';
import * as i0 from "@angular/core";
export declare class CartConnector {
    protected adapter: CartAdapter;
    constructor(adapter: CartAdapter);
    loadAll(userId: string): Observable<Cart[]>;
    load(userId: string, cartId: string): Observable<Cart | undefined>;
    create(userId: string, oldCartId?: string, toMergeCartGuid?: string): Observable<Cart>;
    delete(userId: string, cartId: string): Observable<{}>;
    save(userId: string, cartId: string, saveCartName?: string, saveCartDescription?: string): Observable<Cart>;
    addEmail(userId: string, cartId: string, email: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartConnector>;
}
