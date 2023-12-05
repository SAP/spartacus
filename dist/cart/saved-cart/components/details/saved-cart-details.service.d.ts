import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SavedCartDetailsService {
    protected routingService: RoutingService;
    protected savedCartService: SavedCartFacade;
    protected savedCartId$: Observable<any>;
    protected savedCart$: Observable<Cart | undefined>;
    constructor(routingService: RoutingService, savedCartService: SavedCartFacade);
    getSavedCartId(): Observable<string>;
    getCartDetails(): Observable<Cart | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartDetailsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SavedCartDetailsService>;
}
