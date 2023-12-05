import { OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { OrderDetailActionsComponent } from '../../order-detail-actions/order-detail-actions.component';
import * as i0 from "@angular/core";
export declare class MyAccountV2OrderDetailsActionsComponent extends OrderDetailActionsComponent implements OnInit {
    order: Order;
    protected eventService: EventService;
    ngOnInit(): void;
    showDialog(order: Order): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2OrderDetailsActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2OrderDetailsActionsComponent, "cx-my-account-v2-order-details-actions", never, {}, {}, never, never, false, never>;
}
