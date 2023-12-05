import { ActionsSubject } from '@ngrx/store';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { NavigationEvent } from './navigation.event';
import * as i0 from "@angular/core";
/**
 * A builder for the NavigationEvent
 */
export declare class NavigationEventBuilder {
    protected actions: ActionsSubject;
    protected eventService: EventService;
    constructor(actions: ActionsSubject, eventService: EventService);
    /**
     * Registers events
     */
    protected register(): void;
    /**
     * Builds the navigation events
     */
    protected buildNavigationEvent(): Observable<NavigationEvent>;
    private getNavigatedEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NavigationEventBuilder>;
}
