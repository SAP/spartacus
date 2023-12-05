import { Type } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventService } from '../../event/event.service';
import { ActionToEventMapping } from './action-to-event-mapping';
import * as i0 from "@angular/core";
/**
 * Registers streams of ngrx actions as events source streams
 */
export declare class StateEventService {
    protected actionsSubject: ActionsSubject;
    protected eventService: EventService;
    constructor(actionsSubject: ActionsSubject, eventService: EventService);
    /**
     * Registers an event source stream of specific events
     * mapped from a given action type.
     *
     * @param mapping mapping from action to event
     *
     * @returns a teardown function that unregisters the event source
     */
    register<T>(mapping: ActionToEventMapping<T>): () => void;
    /**
     * Returns a stream of specific events mapped from a specific action.
     * @param mapping mapping from action to event
     */
    protected getFromAction<T>(mapping: ActionToEventMapping<T>): Observable<T>;
    /**
     * Creates an event instance for given class out from the action object.
     * Unless the `factory` parameter is given, the action's `payload` is used
     * as the argument for the event's constructor.
     *
     * @param action instance of an Action
     * @param mapping mapping from action to event
     * @param factory optional function getting an action instance and returning an event instance
     *
     * @returns instance of an Event
     */
    protected createEvent<T>(action: {
        type: string;
        payload?: any;
    }, eventType: Type<T>, factory?: (action: any) => T): T;
    static ɵfac: i0.ɵɵFactoryDeclaration<StateEventService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StateEventService>;
}
