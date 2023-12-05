import { OnDestroy } from '@angular/core';
import { EventService, GlobalMessageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Checkout payment event listener.
 */
export declare class CheckoutPaymentEventListener implements OnDestroy {
    protected eventService: EventService;
    protected globalMessageService: GlobalMessageService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService, globalMessageService: GlobalMessageService);
    protected onPaymentCreated(): void;
    protected onPaymentSet(): void;
    protected onGetCardTypesQueryReload(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentEventListener>;
}
