import { OnDestroy, OnInit } from '@angular/core';
import { ReturnRequest } from '@spartacus/order/root';
import { Observable, Subscription } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import * as i0 from "@angular/core";
export declare class ReturnRequestOverviewComponent implements OnInit, OnDestroy {
    protected returnRequestService: ReturnRequestService;
    constructor(returnRequestService: ReturnRequestService);
    rma: string;
    subscription: Subscription;
    returnRequest$: Observable<ReturnRequest>;
    isCancelling$: Observable<boolean>;
    ngOnInit(): void;
    cancelReturn(returnRequestCode: string): void;
    back(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReturnRequestOverviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReturnRequestOverviewComponent, "cx-return-request-overview", never, {}, {}, never, never, false, never>;
}
