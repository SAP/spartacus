import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CartOutlets, DeliveryMode, OrderEntry } from '@spartacus/cart/base/root';
import { Address, TranslationService } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderConfirmationShippingComponent implements OnInit, OnDestroy {
    protected orderFacade: OrderFacade;
    protected translationService: TranslationService;
    protected cd: ChangeDetectorRef;
    protected outlet?: OutletContextData<{
        showItemList?: boolean | undefined;
        order?: any;
    }> | undefined;
    showItemList: boolean;
    readonly cartOutlets: typeof CartOutlets;
    entries: OrderEntry[] | undefined;
    order$: Observable<Order | undefined>;
    protected subscription: Subscription;
    constructor(orderFacade: OrderFacade, translationService: TranslationService, cd: ChangeDetectorRef, outlet?: OutletContextData<{
        showItemList?: boolean | undefined;
        order?: any;
    }> | undefined);
    ngOnInit(): void;
    getDeliveryAddressCard(deliveryAddress: Address, countryName?: string): Observable<Card>;
    getDeliveryModeCard(deliveryMode: DeliveryMode): Observable<Card>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConfirmationShippingComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderConfirmationShippingComponent, "cx-order-confirmation-shipping", never, { "showItemList": "showItemList"; }, {}, never, never, false, never>;
}
