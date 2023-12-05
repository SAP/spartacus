import { UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import * as i0 from "@angular/core";
export declare class ReturnOrderConfirmationComponent {
    protected orderAmendService: OrderAmendService;
    orderCode: string;
    form$: Observable<UntypedFormGroup>;
    entries$: Observable<OrderEntry[]>;
    constructor(orderAmendService: OrderAmendService);
    submit(form: UntypedFormGroup): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReturnOrderConfirmationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReturnOrderConfirmationComponent, "cx-return-order-confirmation", never, {}, {}, never, never, false, never>;
}
