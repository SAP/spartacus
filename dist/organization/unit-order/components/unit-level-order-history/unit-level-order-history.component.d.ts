import { OnDestroy } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { OrderHistoryQueryParams } from '@spartacus/organization/unit-order/core';
import { Observable } from 'rxjs';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';
import * as i0 from "@angular/core";
export declare class UnitLevelOrderHistoryComponent implements OnDestroy {
    protected routing: RoutingService;
    protected unitOrdersFacade: UnitOrderFacade;
    protected translation: TranslationService;
    private PAGE_SIZE;
    sortType: string;
    queryParams: OrderHistoryQueryParams;
    constructor(routing: RoutingService, unitOrdersFacade: UnitOrderFacade, translation: TranslationService);
    orders$: Observable<OrderHistoryList | undefined>;
    isLoaded$: Observable<boolean>;
    ngOnDestroy(): void;
    filterChange(newFilters: OrderHistoryQueryParams): void;
    private updateQueryParams;
    changeSortCode(sortCode: string): void;
    pageChange(page: number): void;
    goToOrderDetail(order: Order): void;
    getSortLabels(): Observable<{
        byDate: string;
        byOrderNumber: string;
    }>;
    private fetchOrders;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitLevelOrderHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitLevelOrderHistoryComponent, "cx-unit-level-order-history", never, {}, {}, never, never, false, never>;
}
