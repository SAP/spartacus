import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { CartActions } from '../actions/index';
import { StateWithMultiCart } from '../multi-cart-state';
import * as i0 from "@angular/core";
export declare class CartEffects {
    private actions$;
    private cartConnector;
    private store;
    private contextChange$;
    protected logger: LoggerService;
    loadCart$: Observable<CartActions.LoadCartFail | CartActions.LoadCartSuccess | CartActions.RemoveCart | CartActions.LoadCart>;
    protected handleLoadCartError(payload: any, error: any): Observable<CartActions.LoadCart> | Observable<CartActions.RemoveCart> | Observable<CartActions.LoadCartFail>;
    createCart$: Observable<CartActions.MergeCartSuccess | CartActions.CreateCartSuccess | CartActions.CreateCartFail | CartActions.RemoveCart>;
    mergeCart$: Observable<CartActions.CreateCart>;
    refresh$: Observable<CartActions.LoadCart | CartActions.CartProcessesDecrement>;
    refreshWithoutProcesses$: Observable<CartActions.LoadCart>;
    resetCartDetailsOnSiteContextChange$: Observable<CartActions.ResetCartDetails>;
    addEmail$: Observable<CartActions.AddEmailToCartSuccess | CartActions.AddEmailToCartFail | CartActions.LoadCart>;
    deleteCart$: Observable<CartActions.DeleteCartSuccess | CartActions.DeleteCartFail | CartActions.LoadCart>;
    constructor(actions$: Actions, cartConnector: CartConnector, store: Store<StateWithMultiCart>);
    static ɵfac: i0.ɵɵFactoryDeclaration<CartEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartEffects>;
}
