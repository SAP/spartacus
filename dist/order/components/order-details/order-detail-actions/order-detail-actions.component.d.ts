import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailActionsComponent {
    protected orderDetailsService: OrderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    order$: Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailActionsComponent, "cx-order-details-actions", never, {}, {}, never, never, false, never>;
}
