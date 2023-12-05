import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartActions, CartConnector, StateWithMultiCart } from '@spartacus/cart/base/core';
import { LoggerService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { WishListActions } from '../actions';
import * as i0 from "@angular/core";
export declare class WishListEffects {
    private actions$;
    private cartConnector;
    private userIdService;
    private store;
    protected logger: LoggerService;
    createWishList$: Observable<WishListActions.CreateWishListSuccess | WishListActions.CreateWishListFail>;
    loadWishList$: Observable<WishListActions.LoadWishListSuccess | CartActions.RemoveCart | WishListActions.CreateWishList | WishListActions.LoadWishListFail>;
    resetWishList$: Observable<WishListActions.LoadWishListSuccess | WishListActions.LoadWishListFail>;
    setWishListId$: Observable<CartActions.SetCartTypeIndex>;
    setWishListData$: Observable<CartActions.SetCartData>;
    constructor(actions$: Actions, cartConnector: CartConnector, userIdService: UserIdService, store: Store<StateWithMultiCart>);
    static ɵfac: i0.ɵɵFactoryDeclaration<WishListEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WishListEffects>;
}
