import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class QuickOrderItemComponent implements OnInit, OnDestroy {
    protected cd: ChangeDetectorRef;
    protected quickOrderService: QuickOrderFacade;
    quantityControl: UntypedFormControl;
    get entry(): OrderEntry;
    set entry(value: OrderEntry);
    index: number;
    loading: boolean;
    protected _entry: OrderEntry;
    protected subscription: Subscription;
    constructor(cd: ChangeDetectorRef, quickOrderService: QuickOrderFacade);
    ngOnInit(): void;
    removeEntry(): void;
    protected watchProductAdd(): Subscription;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QuickOrderItemComponent, "[cx-quick-order-item], cx-quick-order-item", never, { "entry": "entry"; "index": "index"; "loading": "loading"; }, {}, never, never, false, never>;
}
