import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { MultiCartFacade } from '../facade/multi-cart.facade';
import * as i0 from "@angular/core";
export declare class MultiCartEventListener implements OnDestroy {
    protected eventService: EventService;
    protected multiCartFacade: MultiCartFacade;
    protected subscriptions: Subscription;
    constructor(eventService: EventService, multiCartFacade: MultiCartFacade);
    /**
     * Registers events for the cart base actions.
     */
    protected onCartBaseAction(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiCartEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiCartEventListener>;
}
