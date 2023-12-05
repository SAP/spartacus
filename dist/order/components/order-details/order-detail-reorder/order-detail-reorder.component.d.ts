import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailReorderComponent implements OnInit, OnDestroy {
    protected orderDetailsService: OrderDetailsService;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    constructor(orderDetailsService: OrderDetailsService, launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    element: ElementRef;
    protected subscription: Subscription;
    order$: Observable<any>;
    ngOnInit(): void;
    onReorderClick(order: any): void;
    launchDialog(orderCode: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailReorderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailReorderComponent, "cx-order-details-reorder", never, {}, {}, never, never, false, never>;
}
