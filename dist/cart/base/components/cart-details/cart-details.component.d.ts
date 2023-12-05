import { OnInit } from '@angular/core';
import { CartConfigService } from '@spartacus/cart/base/core';
import { ActiveCartFacade, Cart, OrderEntry, PromotionLocation, SelectiveCartFacade } from '@spartacus/cart/base/root';
import { AuthService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartDetailsComponent implements OnInit {
    protected activeCartService: ActiveCartFacade;
    protected selectiveCartService: SelectiveCartFacade;
    protected authService: AuthService;
    protected routingService: RoutingService;
    protected cartConfig: CartConfigService;
    cart$: Observable<Cart>;
    entries$: Observable<OrderEntry[]>;
    cartLoaded$: Observable<boolean>;
    loggedIn: boolean;
    promotionLocation: PromotionLocation;
    selectiveCartEnabled: boolean;
    constructor(activeCartService: ActiveCartFacade, selectiveCartService: SelectiveCartFacade, authService: AuthService, routingService: RoutingService, cartConfig: CartConfigService);
    ngOnInit(): void;
    saveForLater(item: OrderEntry): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartDetailsComponent, "cx-cart-details", never, {}, {}, never, never, false, never>;
}
