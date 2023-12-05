import { UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { GlobalMessageType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import * as i0 from "@angular/core";
export declare class CancelOrderComponent {
    protected orderAmendService: OrderAmendService;
    orderCode: string;
    globalMessageType: typeof GlobalMessageType;
    form$: Observable<UntypedFormGroup>;
    entries$: Observable<OrderEntry[]>;
    constructor(orderAmendService: OrderAmendService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CancelOrderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CancelOrderComponent, "cx-cancel-order", never, {}, {}, never, never, false, never>;
}
