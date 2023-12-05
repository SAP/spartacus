import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutCostCenterEventListener implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService);
    protected onCostCenterSet(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutCostCenterEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutCostCenterEventListener>;
}
