import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthService, EventService, SiteContextParamsService, StatePersistenceService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MiniCartComponentService {
    protected activeCartFacade: ActiveCartFacade;
    protected authService: AuthService;
    protected statePersistenceService: StatePersistenceService;
    protected siteContextParamsService: SiteContextParamsService;
    protected eventService: EventService;
    constructor(activeCartFacade: ActiveCartFacade, authService: AuthService, statePersistenceService: StatePersistenceService, siteContextParamsService: SiteContextParamsService, eventService: EventService);
    /**
     * This function supports lazy loading of the cart functionality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getQuantity(): Observable<number>;
    /**
     * This function supports lazy loading of the cart functionality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getTotalPrice(): Observable<string>;
    /**
     * This function determines if it is required to get active cart data from ActiveCartFacade.
     * It is required to call the ActiveCartFacade if one of these criteria is met:
     * - There is an active cart id in the browser local storage
     * - A user is authenticated
     * - The cart library code chunk with the ActiveCartFacade implementation is already loaded.
     *
     * Once the observable returned by activeCartRequired emits true, it completes.
     * activeCartRequired helps to make the mini cart compatible with some level of lazy loading.
     */
    protected activeCartRequired(): Observable<boolean>;
    protected hasActiveCartInStorage(): Observable<boolean>;
    protected isCartCreated(): Observable<boolean>;
    protected getCartStateFromBrowserStorage(): Observable<{
        active: string;
    } | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MiniCartComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MiniCartComponentService>;
}
