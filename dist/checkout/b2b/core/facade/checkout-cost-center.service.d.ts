import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { CheckoutCostCenterFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Command, CommandService, CostCenter, EventService, QueryState, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutCostCenterConnector } from '../connectors/checkout-cost-center/checkout-cost-center.connector';
import * as i0 from "@angular/core";
export declare class CheckoutCostCenterService implements CheckoutCostCenterFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected commandService: CommandService;
    protected checkoutCostCenterConnector: CheckoutCostCenterConnector;
    protected checkoutQueryFacade: CheckoutQueryFacade;
    protected eventService: EventService;
    protected setCostCenterCommand: Command<string, Cart>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, commandService: CommandService, checkoutCostCenterConnector: CheckoutCostCenterConnector, checkoutQueryFacade: CheckoutQueryFacade, eventService: EventService);
    protected checkoutPreconditions(): Observable<[string, string]>;
    getCostCenterState(): Observable<QueryState<CostCenter | undefined>>;
    setCostCenter(costCenterId: string): Observable<Cart>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutCostCenterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutCostCenterService>;
}
