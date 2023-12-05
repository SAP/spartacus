import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Consignment, ConsignmentTracking, OrderHistoryFacade } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ConsignmentTrackingComponent implements OnInit, OnDestroy {
    protected orderHistoryFacade: OrderHistoryFacade;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    consignmentStatus: string[];
    element: ElementRef;
    consignment: Consignment;
    orderCode: string;
    consignmentTracking$: Observable<ConsignmentTracking>;
    constructor(orderHistoryFacade: OrderHistoryFacade, launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    ngOnInit(): void;
    openTrackingDialog(consignment: Consignment): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsignmentTrackingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConsignmentTrackingComponent, "cx-consignment-tracking", never, { "consignment": "consignment"; "orderCode": "orderCode"; }, {}, never, never, false, never>;
}
