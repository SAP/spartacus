import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageService, TranslationService } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderConfirmationThankYouMessageComponent implements OnInit, AfterViewInit, OnDestroy {
    protected orderFacade: OrderFacade;
    protected globalMessageService: GlobalMessageService;
    protected translationService: TranslationService;
    order$: Observable<Order | undefined>;
    isGuestCustomer: boolean;
    orderGuid: string | undefined;
    constructor(orderFacade: OrderFacade, globalMessageService: GlobalMessageService, translationService: TranslationService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected addThankYouMessage(): void;
    protected getThankYouAssistiveMessage(): Observable<[
        Order | undefined,
        string,
        string,
        string
    ]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConfirmationThankYouMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderConfirmationThankYouMessageComponent, "cx-order-confirmation-thank-you-message", never, {}, {}, never, never, false, never>;
}
