import { GetOrderEntriesContext, OrderEntriesSource, OrderEntry } from '@spartacus/cart/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderConfirmationOrderEntriesContext implements GetOrderEntriesContext {
    protected orderFacade: OrderFacade;
    readonly type = OrderEntriesSource.ORDER_CONFIRMATION;
    constructor(orderFacade: OrderFacade);
    getEntries(): Observable<OrderEntry[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConfirmationOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderConfirmationOrderEntriesContext>;
}
