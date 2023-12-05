import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { ReplenishmentOrder, ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrderCancellationComponent implements OnDestroy {
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    element: ElementRef;
    private subscription;
    replenishmentOrder$: Observable<ReplenishmentOrder>;
    constructor(replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    openDialog(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrderCancellationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReplenishmentOrderCancellationComponent, "cx-replenishment-order-cancellation", never, {}, {}, never, never, false, never>;
}
