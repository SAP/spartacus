import { Actions } from '@ngrx/effects';
import { CartActions, CartConnector } from '@spartacus/cart/base/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { GlobalMessageService, LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class SavedCartEffects {
    private actions$;
    private savedCartConnector;
    private activeCartService;
    private globalMessageService;
    private cartConnector;
    protected logger: LoggerService;
    loadSavedCart$: Observable<CartActions.LoadCartSuccess | SavedCartActions.LoadSavedCartFail | SavedCartActions.LoadSavedCartSuccess>;
    loadSavedCarts$: Observable<CartActions.LoadCartsSuccess | SavedCartActions.LoadSavedCartsFail | SavedCartActions.LoadSavedCartsSuccess>;
    restoreSavedCart$: Observable<SavedCartActions.RestoreSavedCartFail | SavedCartActions.RestoreSavedCartSuccess | SavedCartActions.LoadSavedCarts | SavedCartActions.SaveCart | CartActions.LoadCartSuccess | CartActions.SetActiveCartId>;
    saveCart$: Observable<SavedCartActions.SaveCartFail | SavedCartActions.SaveCartSuccess | SavedCartActions.SaveCart | CartActions.LoadCartSuccess | CartActions.ClearCartState>;
    editSavedCart$: Observable<SavedCartActions.EditSavedCartFail | SavedCartActions.EditSavedCartSuccess | SavedCartActions.EditSavedCart | CartActions.LoadCartSuccess>;
    cloneSavedCart$: Observable<SavedCartActions.CloneSavedCartFail | SavedCartActions.CloneSavedCartSuccess | SavedCartActions.CloneSavedCart | SavedCartActions.RestoreSavedCart | SavedCartActions.LoadSavedCarts>;
    constructor(actions$: Actions, savedCartConnector: SavedCartConnector, activeCartService: ActiveCartFacade, globalMessageService: GlobalMessageService, cartConnector: CartConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SavedCartEffects>;
}
