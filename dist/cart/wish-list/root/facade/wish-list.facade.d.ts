import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class WishListFacade {
    abstract createWishList(userId: string, name?: string, description?: string): void;
    abstract getWishList(): Observable<Cart>;
    abstract loadWishList(userId: string, customerId: string): void;
    abstract addEntry(productCode: string): void;
    abstract removeEntry(entry: OrderEntry): void;
    abstract getWishListLoading(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WishListFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WishListFacade>;
}
