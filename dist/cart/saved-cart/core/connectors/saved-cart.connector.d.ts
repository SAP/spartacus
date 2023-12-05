import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';
import * as i0 from "@angular/core";
export declare class SavedCartConnector {
    protected adapter: SavedCartAdapter;
    constructor(adapter: SavedCartAdapter);
    get(userId: string, cartId: string): Observable<Cart>;
    getList(userId: string): Observable<Cart[]>;
    restoreSavedCart(userId: string, cartId: string): Observable<Cart>;
    cloneSavedCart(userId: string, cartId: string, saveCartName?: string): Observable<Cart>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SavedCartConnector>;
}
