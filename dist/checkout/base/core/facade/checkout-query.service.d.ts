import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutQueryFacade, CheckoutState } from '@spartacus/checkout/base/root';
import { Query, QueryNotifier, QueryService, QueryState, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import * as i0 from "@angular/core";
export declare class CheckoutQueryService implements CheckoutQueryFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected queryService: QueryService;
    protected checkoutConnector: CheckoutConnector;
    /**
     * Returns the reload events for the checkout query.
     */
    protected getCheckoutQueryReloadEvents(): QueryNotifier[];
    /**
     * Returns the reset events for the checkout query.
     */
    protected getCheckoutQueryResetEvents(): QueryNotifier[];
    protected checkoutQuery$: Query<CheckoutState | undefined>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, queryService: QueryService, checkoutConnector: CheckoutConnector);
    /**
     * Performs the necessary checkout preconditions.
     */
    protected checkoutPreconditions(): Observable<[string, string]>;
    getCheckoutDetailsState(): Observable<QueryState<CheckoutState | undefined>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutQueryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutQueryService>;
}
