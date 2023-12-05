import { CartConfigService } from '@spartacus/cart/base/core';
import { ActiveCartFacade, Cart, SelectiveCartFacade } from '@spartacus/cart/base/root';
import { PageLayoutHandler } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartPageLayoutHandler implements PageLayoutHandler {
    protected activeCartService: ActiveCartFacade;
    protected selectiveCartService: SelectiveCartFacade;
    protected cartConfig: CartConfigService;
    constructor(activeCartService: ActiveCartFacade, selectiveCartService: SelectiveCartFacade, cartConfig: CartConfigService);
    handle(slots$: Observable<string[]>, pageTemplate?: string, section?: string): Observable<string[]>;
    protected getSelectiveCart(): Observable<Cart | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartPageLayoutHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartPageLayoutHandler>;
}
