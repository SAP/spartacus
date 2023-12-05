import { RoutingService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';
import * as i0 from "@angular/core";
export declare class UnitLevelOrderDetailService {
    private unitOrderFacade;
    private routingService;
    orderCode$: Observable<string>;
    orderLoad$: Observable<string>;
    constructor(unitOrderFacade: UnitOrderFacade, routingService: RoutingService);
    getOrderDetails(): Observable<Order>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitLevelOrderDetailService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitLevelOrderDetailService>;
}
