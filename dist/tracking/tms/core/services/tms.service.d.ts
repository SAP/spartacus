import { Injector, OnDestroy } from '@angular/core';
import { CxEvent, EventService, LoggerService, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { TmsConfig } from '../config/tms-config';
import * as i0 from "@angular/core";
/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
export declare class TmsService implements OnDestroy {
    protected eventsService: EventService;
    protected windowRef: WindowRef;
    protected tmsConfig: TmsConfig;
    protected injector: Injector;
    /**
     * Stores subscriptions to events.
     */
    protected subscription: Subscription;
    protected logger: LoggerService;
    constructor(eventsService: EventService, windowRef: WindowRef, tmsConfig: TmsConfig, injector: Injector);
    /**
     * Called only once to start collecting and dispatching events
     */
    collect(): void;
    /**
     * Maps the given events to an appropriate type that fits the specified TMS' structure.
     *
     * @param events - the events to map
     * @param collector - a name of the collector for which the events should be mapped
     */
    protected mapEvents<T extends CxEvent>(events: Observable<T>[]): Observable<T>;
    /**
     * Angular's callback
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TmsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TmsService>;
}
