import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutPlaceOrderEventListener implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService);
    protected onOrderPlaced(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPlaceOrderEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPlaceOrderEventListener>;
}
