import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Checkout delivery mode event listener.
 */
export declare class CheckoutDeliveryModeEventListener implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService);
    protected onDeliveryModeSet(): void;
    protected onDeliveryModeCleared(): void;
    protected onDeliveryModeClearedError(): void;
    /**
     * Registers listeners for the delivery mode clear event.
     * This is needed for when `CheckoutSupportedDeliveryModesQueryResetEvent` is dispatched
     * as we need to update the user's cart when the delivery mode is cleared from the backend checkout details.
     */
    protected onDeliveryModeReset(): void;
    protected onGetSupportedDeliveryModesQueryReload(): void;
    protected onGetSupportedDeliveryModesQueryReset(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryModeEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryModeEventListener>;
}
