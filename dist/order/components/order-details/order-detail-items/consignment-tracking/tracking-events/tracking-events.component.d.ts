import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ConsignmentTracking, OrderHistoryFacade } from '@spartacus/order/root';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TrackingEventsComponent implements OnDestroy, OnInit {
    protected orderHistoryFacade: OrderHistoryFacade;
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    private subscription;
    tracking$: Observable<ConsignmentTracking>;
    shipDate: Date;
    focusConfig: FocusConfig;
    handleClick(event: UIEvent): void;
    constructor(orderHistoryFacade: OrderHistoryFacade, launchDialogService: LaunchDialogService, el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    init(tracking$: Observable<ConsignmentTracking>, shipDate: Date): void;
    close(reason?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrackingEventsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TrackingEventsComponent, "cx-tracking-events", never, {}, {}, never, never, false, never>;
}
