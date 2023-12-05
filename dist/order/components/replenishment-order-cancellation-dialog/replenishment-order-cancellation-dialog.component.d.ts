import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import { ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrderCancellationDialogComponent implements OnInit, OnDestroy {
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;
    protected globalMessageService: GlobalMessageService;
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    private subscription;
    iconTypes: typeof ICON_TYPE;
    replenishmentOrderCode: string;
    focusConfig: FocusConfig;
    handleClick(event: UIEvent): void;
    constructor(replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade, globalMessageService: GlobalMessageService, launchDialogService: LaunchDialogService, el: ElementRef);
    ngOnInit(): void;
    onSuccess(value: boolean): void;
    close(reason: string): void;
    cancelReplenishment(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrderCancellationDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReplenishmentOrderCancellationDialogComponent, "cx-replenishment-order-cancellation-dialog", never, {}, {}, never, never, false, never>;
}
