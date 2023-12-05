import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class CartEntryEffects {
    private actions$;
    private cartEntryConnector;
    private contextChange$;
    protected logger: LoggerService;
    addEntry$: Observable<CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail | CartActions.LoadCart>;
    removeEntry$: Observable<CartActions.CartRemoveEntrySuccess | CartActions.CartRemoveEntryFail | CartActions.LoadCart>;
    updateEntry$: Observable<CartActions.CartUpdateEntrySuccess | CartActions.CartUpdateEntryFail | CartActions.LoadCart>;
    constructor(actions$: Actions, cartEntryConnector: CartEntryConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<CartEntryEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartEntryEffects>;
}
