import { OnInit } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailTotalsComponent implements OnInit {
    protected orderDetailsService: OrderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    order$: Observable<any>;
    readonly CartOutlets: typeof CartOutlets;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailTotalsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailTotalsComponent, "cx-order-details-totals", never, {}, {}, never, never, false, never>;
}
