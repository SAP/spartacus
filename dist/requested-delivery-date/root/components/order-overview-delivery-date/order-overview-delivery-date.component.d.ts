import { OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { DateValidationService } from '../shared/date-validation.service';
import * as i0 from "@angular/core";
export declare class OrderOverviewDeliveryDateComponent implements OnInit, OnDestroy {
    protected dateValidationService: DateValidationService;
    protected translation: TranslationService;
    protected orderOutlet?: OutletContextData<any> | undefined;
    constructor(dateValidationService: DateValidationService, translation: TranslationService, orderOutlet?: OutletContextData<any> | undefined);
    protected subscription: Subscription;
    order: Order;
    ngOnInit(): void;
    isRequestedDeliveryDatePresent(): boolean;
    getRequestedDeliveryDateCardContent(isoDate: string | null): Observable<Card>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderOverviewDeliveryDateComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderOverviewDeliveryDateComponent, "cx-order-overview-delivery-date", never, {}, {}, never, never, false, never>;
}
