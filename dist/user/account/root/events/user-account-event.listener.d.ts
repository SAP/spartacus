import { OnDestroy } from '@angular/core';
import { EventService, GlobalMessageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * User account event listener.
 */
export declare class UserAccountEventListener implements OnDestroy {
    protected eventService: EventService;
    protected globalMessageService: GlobalMessageService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService, globalMessageService: GlobalMessageService);
    /**
     * Registers events for the auth events.
     */
    protected onAuth(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAccountEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAccountEventListener>;
}
