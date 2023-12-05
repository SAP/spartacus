import { UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import * as i0 from "@angular/core";
export declare class ReturnOrderComponent {
    protected orderAmendService: OrderAmendService;
    orderCode: string;
    form$: Observable<UntypedFormGroup>;
    entries$: Observable<OrderEntry[]>;
    constructor(orderAmendService: OrderAmendService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ReturnOrderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReturnOrderComponent, "cx-return-order", never, {}, {}, never, never, false, never>;
}
