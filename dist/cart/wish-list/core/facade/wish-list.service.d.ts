import { Store } from '@ngrx/store';
import { StateWithMultiCart } from '@spartacus/cart/base/core';
import { Cart, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class WishListService implements WishListFacade {
    protected store: Store<StateWithMultiCart>;
    protected userAccountFacade: UserAccountFacade;
    protected multiCartFacade: MultiCartFacade;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithMultiCart>, userAccountFacade: UserAccountFacade, multiCartFacade: MultiCartFacade, userIdService: UserIdService);
    createWishList(userId: string, name?: string, description?: string): void;
    getWishList(): Observable<Cart>;
    loadWishList(userId: string, customerId: string): void;
    addEntry(productCode: string): void;
    removeEntry(entry: OrderEntry): void;
    getWishListLoading(): Observable<boolean>;
    protected getWishListId(): Observable<string>;
    private getWishListIdWithUserId;
    static ɵfac: i0.ɵɵFactoryDeclaration<WishListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WishListService>;
}
