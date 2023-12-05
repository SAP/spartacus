import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { ReplenishmentOrder, ReplenishmentOrderHistoryFacade, ReplenishmentOrderList } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrderHistoryComponent implements OnDestroy {
    protected routing: RoutingService;
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;
    protected translation: TranslationService;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    element: ElementRef;
    private subscription;
    private PAGE_SIZE;
    sortType: string;
    replenishmentOrders$: Observable<ReplenishmentOrderList | undefined>;
    isLoaded$: Observable<boolean>;
    constructor(routing: RoutingService, replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade, translation: TranslationService, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    changeSortCode(sortCode: string): void;
    pageChange(page: number): void;
    goToOrderDetail(order: ReplenishmentOrder): void;
    getSortLabels(): Observable<{
        byDate: string;
        byReplenishmentNumber: string;
        byNextOrderDate: string;
    }>;
    openDialog(event: Event, replenishmentOrderCode: string): void;
    private fetchReplenishmentOrders;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrderHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReplenishmentOrderHistoryComponent, "cx-replenishment-order-history", never, {}, {}, never, never, false, never>;
}
