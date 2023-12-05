import { EventService, StateEventService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class CdcEventBuilder {
    protected stateEventService: StateEventService;
    protected eventService: EventService;
    constructor(stateEventService: StateEventService, eventService: EventService);
    /**
     * Registers CDC events
     */
    protected register(): void;
    /**
     * Register the load user token fail event.
     */
    protected registerLoadUserTokenFail(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcEventBuilder>;
}
