import { OnDestroy } from '@angular/core';
import { ReturnRequest } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import * as i0 from "@angular/core";
export declare class ReturnRequestTotalsComponent implements OnDestroy {
    protected returnRequestService: ReturnRequestService;
    constructor(returnRequestService: ReturnRequestService);
    returnRequest$: Observable<ReturnRequest>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReturnRequestTotalsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReturnRequestTotalsComponent, "cx-return-request-totals", never, {}, {}, never, never, false, never>;
}
