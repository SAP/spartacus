import { RoutingService } from '@spartacus/core';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderDetailsService {
    private orderHistoryFacade;
    private routingService;
    orderCode$: Observable<string>;
    orderLoad$: Observable<{}>;
    constructor(orderHistoryFacade: OrderHistoryFacade, routingService: RoutingService);
    isOrderDetailsLoading(): Observable<boolean>;
    getOrderDetails(): Observable<Order>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderDetailsService>;
}
