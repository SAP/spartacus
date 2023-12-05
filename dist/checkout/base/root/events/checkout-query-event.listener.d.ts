import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutQueryEventListener implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService);
    protected onCheckoutQueryReload(): void;
    protected onCheckoutQueryReset(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutQueryEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutQueryEventListener>;
}
