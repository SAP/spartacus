import { RoutingService } from '@spartacus/core';
import { ReplenishmentOrder, ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrderDetailsService {
    protected routingService: RoutingService;
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;
    protected replenishmentOrderCode$: Observable<any>;
    protected replenishmentOrderLoad$: Observable<string>;
    constructor(routingService: RoutingService, replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade);
    getOrderDetails(): Observable<ReplenishmentOrder>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrderDetailsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReplenishmentOrderDetailsService>;
}
