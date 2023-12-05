import { OnDestroy } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderConfirmationItemsComponent implements OnDestroy {
    protected orderFacade: OrderFacade;
    readonly cartOutlets: typeof CartOutlets;
    promotionLocation: PromotionLocation;
    order$: Observable<Order | undefined>;
    constructor(orderFacade: OrderFacade);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConfirmationItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderConfirmationItemsComponent, "cx-order-confirmation-items", never, {}, {}, never, never, false, never>;
}
