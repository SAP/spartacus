import { ReturnRequest } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import * as i0 from "@angular/core";
export declare class ReturnRequestItemsComponent {
    protected returnRequestService: ReturnRequestService;
    constructor(returnRequestService: ReturnRequestService);
    returnRequest$: Observable<ReturnRequest>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReturnRequestItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReturnRequestItemsComponent, "cx-return-request-items", never, {}, {}, never, never, false, never>;
}
