import { GetOrderEntriesContext, OrderEntriesSource, OrderEntry } from '@spartacus/cart/base/root';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderDetailsOrderEntriesContext implements GetOrderEntriesContext {
    protected orderHistoryFacade: OrderHistoryFacade;
    readonly type = OrderEntriesSource.ORDER_DETAILS;
    constructor(orderHistoryFacade: OrderHistoryFacade);
    getEntries(): Observable<OrderEntry[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailsOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderDetailsOrderEntriesContext>;
}
