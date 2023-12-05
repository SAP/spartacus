import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Price } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details/order-details.service';
import { AmendOrderType } from './amend-order.model';
import * as i0 from "@angular/core";
export declare abstract class OrderAmendService {
    protected orderDetailsService: OrderDetailsService;
    protected amendType: AmendOrderType;
    protected form: UntypedFormGroup;
    constructor(orderDetailsService: OrderDetailsService);
    /**
     * Returns entries for the given order.
     */
    abstract getEntries(): Observable<OrderEntry[]>;
    /**
     * Returns entries with an amended quantity.
     */
    getAmendedEntries(): Observable<OrderEntry[]>;
    /**
     * Submits the amended order.
     */
    abstract save(): void;
    getOrder(): Observable<Order>;
    /**
     * returns the form with form data at runtime
     */
    getForm(): Observable<UntypedFormGroup>;
    private buildForm;
    protected getFormControl(form: UntypedFormGroup, entry: OrderEntry): UntypedFormControl;
    /**
     * As discussed, this calculation is moved to SPA side.
     * The calculation and validation should be in backend facade layer.
     */
    getAmendedPrice(entry: OrderEntry): Price;
    getMaxAmendQuantity(entry: OrderEntry): number;
    isCancellation(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderAmendService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderAmendService>;
}
