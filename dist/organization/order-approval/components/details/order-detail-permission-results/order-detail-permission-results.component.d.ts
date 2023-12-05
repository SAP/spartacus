import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderDetailPermissionResultsComponent {
    protected orderDetailsService: OrderDetailsService;
    order$: Observable<Order>;
    constructor(orderDetailsService: OrderDetailsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailPermissionResultsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailPermissionResultsComponent, "cx-order-detail-permission-results", never, {}, {}, never, never, false, never>;
}
