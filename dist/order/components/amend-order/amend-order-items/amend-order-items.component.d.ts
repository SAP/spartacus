import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../amend-order.service';
import * as i0 from "@angular/core";
export declare class CancelOrReturnItemsComponent {
    protected orderAmendService: OrderAmendService;
    entries: OrderEntry[];
    isConfirmation: boolean;
    form$: Observable<UntypedFormGroup>;
    constructor(orderAmendService: OrderAmendService);
    getControl(form: UntypedFormGroup, entry: OrderEntry): UntypedFormControl;
    setAll(form: UntypedFormGroup): void;
    getItemPrice(entry: OrderEntry): Price;
    getMaxAmendQuantity(entry: OrderEntry): number;
    isCancellation(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CancelOrReturnItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CancelOrReturnItemsComponent, "cx-amend-order-items", never, { "entries": "entries"; "isConfirmation": "isConfirmation"; }, {}, never, never, false, never>;
}
