import { OnDestroy, OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderSummaryComponent implements OnInit, OnDestroy {
    protected outlet?: OutletContextData<any> | undefined;
    cart: Cart;
    protected subscription: Subscription;
    constructor(outlet?: OutletContextData<any> | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderSummaryComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderSummaryComponent, "cx-order-summary", never, { "cart": "cart"; }, {}, never, never, false, never>;
}
