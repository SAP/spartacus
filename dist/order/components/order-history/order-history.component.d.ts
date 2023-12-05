import { OnDestroy } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { Order, OrderHistoryFacade, OrderHistoryList, ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderHistoryComponent implements OnDestroy {
    protected routing: RoutingService;
    protected orderHistoryFacade: OrderHistoryFacade;
    protected translation: TranslationService;
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;
    constructor(routing: RoutingService, orderHistoryFacade: OrderHistoryFacade, translation: TranslationService, replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade);
    private PAGE_SIZE;
    sortType: string;
    hasPONumber: boolean | undefined;
    orders$: Observable<OrderHistoryList | undefined>;
    setOrderHistoryParams(orders: OrderHistoryList | undefined): void;
    hasReplenishmentOrder$: Observable<boolean>;
    isLoaded$: Observable<boolean>;
    /**
     * When "Order Return" feature is enabled, this component becomes one tab in
     * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
     */
    tabTitleParam$: Observable<number>;
    ngOnDestroy(): void;
    changeSortCode(sortCode: string): void;
    pageChange(page: number): void;
    goToOrderDetail(order: Order): void;
    getSortLabels(): Observable<{
        byDate: string;
        byOrderNumber: string;
    }>;
    private fetchOrders;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderHistoryComponent, "cx-order-history", never, {}, {}, never, never, false, never>;
}
