import { OrderEntry } from '@spartacus/cart/base/root';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { AmendOrderType } from '../amend-order.model';
import { OrderAmendService } from '../amend-order.service';
import * as i0 from "@angular/core";
export declare class OrderCancellationService extends OrderAmendService {
    protected orderDetailsService: OrderDetailsService;
    protected orderHistoryFacade: OrderHistoryFacade;
    protected routing: RoutingService;
    protected globalMessageService: GlobalMessageService;
    amendType: AmendOrderType;
    constructor(orderDetailsService: OrderDetailsService, orderHistoryFacade: OrderHistoryFacade, routing: RoutingService, globalMessageService: GlobalMessageService);
    /**
     * Return cancellable order entries.
     */
    getEntries(): Observable<OrderEntry[]>;
    save(): void;
    private afterSave;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderCancellationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderCancellationService>;
}
