import { OnDestroy } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderConfirmationTotalsComponent implements OnDestroy {
    protected orderFacade: OrderFacade;
    readonly cartOutlets: typeof CartOutlets;
    order$: Observable<Order | undefined>;
    constructor(orderFacade: OrderFacade);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConfirmationTotalsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderConfirmationTotalsComponent, "cx-order-confirmation-totals", never, {}, {}, never, never, false, never>;
}
