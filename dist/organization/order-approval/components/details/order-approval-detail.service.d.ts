import { RoutingService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';
import * as i0 from "@angular/core";
export declare class OrderApprovalDetailService {
    protected routingService: RoutingService;
    protected orderApprovalService: OrderApprovalService;
    protected approvalCode$: Observable<any>;
    protected orderApproval$: Observable<OrderApproval | undefined>;
    protected order$: Observable<Order>;
    constructor(routingService: RoutingService, orderApprovalService: OrderApprovalService);
    /**
     * Returns a string that represents the approval code
     * found in the page url.
     */
    getOrderApprovalCodeFromRoute(): Observable<string>;
    /**
     * Returns the order data from the approval details that have been
     * retrieved from the approval code in the page url.
     */
    getOrderDetails(): Observable<Order>;
    /**
     * Returns the approval details that have been retrieved from the
     * approval code in the page url.
     */
    getOrderApproval(): Observable<OrderApproval | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderApprovalDetailService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderApprovalDetailService>;
}
