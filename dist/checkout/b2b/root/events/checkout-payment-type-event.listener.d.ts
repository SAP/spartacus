import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentTypeEventListener implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService);
    protected onPaymentTypeSet(): void;
    protected onGetPaymentTypesQueryReload(): void;
    protected onGetPaymentTypesQueryReset(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentTypeEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentTypeEventListener>;
}
