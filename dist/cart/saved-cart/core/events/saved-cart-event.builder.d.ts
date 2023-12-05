import { ActionsSubject } from '@ngrx/store';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import { ActionToEventMapping, EventService, StateEventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SavedCartEventBuilder {
    protected actionsSubject: ActionsSubject;
    protected eventService: EventService;
    protected stateEventService: StateEventService;
    protected multiCartService: MultiCartFacade;
    constructor(actionsSubject: ActionsSubject, eventService: EventService, stateEventService: StateEventService, multiCartService: MultiCartFacade);
    /**
     * Registers events for the saved cart
     */
    protected register(): void;
    /**
     * Registers restore saved cart events
     */
    protected registerRestoreSavedCartEvents(): void;
    /**
     * Registers save cart events
     */
    protected registerSaveCartEvents(): void;
    /**
     * Registers edit saved cart events
     */
    protected registerEditSavedCartEvents(): void;
    /**
     * Registers clone saved cart events
     */
    protected registerCloneSavedCartEvents(): void;
    /**
     * Builds the restore save cart events from the action and cart
     *
     * @param mapping mapping declaration from `action` string type to `event` class type
     * @param saveTime should the saveTime attribute be added to the event
     * @returns
     */
    protected buildRestoreSavedCartEvents<T>(mapping: ActionToEventMapping<T>): () => void;
    /**
     * Builds save cart event by adding the saveTime from the cart
     *
     * @param mapping mapping declaration from `action` string type to `event` class type
     * @returns events register function
     */
    protected buildSaveCartSuccessEvent<T>(mapping: ActionToEventMapping<T>): () => void;
    /**
     * Returns a stream of actions only of a given type(s)
     *
     * @param actionType type(s) of actions
     */
    protected getAction(actionType: string | string[]): Observable<{
        type: string;
        payload?: any;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SavedCartEventBuilder>;
}
