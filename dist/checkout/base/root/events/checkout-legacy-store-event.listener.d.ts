import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * The event listener which dispatches legacy store actions.
 * It will be removed as soon as the legacy store is removed.
 */
export declare class CheckoutLegacyStoreEventListener implements OnDestroy {
    protected eventService: EventService;
    protected store: Store<unknown>;
    protected subscriptions: Subscription;
    constructor(eventService: EventService, store: Store<unknown>);
    /**
     * Registers events for the user address actions.
     */
    protected onUserAddressAction(): void;
    /**
     * Registers events for the user payment actions.
     */
    protected onUserPaymentAction(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutLegacyStoreEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutLegacyStoreEventListener>;
}
