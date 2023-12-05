import { ActionsSubject } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { ActionToEventMapping, EventService, StateEventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Registers events for the active cart
 */
export declare class CartEventBuilder {
    protected actionsSubject: ActionsSubject;
    protected event: EventService;
    protected activeCartService: ActiveCartFacade;
    protected stateEventService: StateEventService;
    constructor(actionsSubject: ActionsSubject, event: EventService, activeCartService: ActiveCartFacade, stateEventService: StateEventService);
    /**
     * Registers events for the active cart
     */
    protected register(): void;
    /**
     * Register events for adding entry to the active cart
     */
    protected registerAddEntry(): void;
    protected registerRemoveEntry(): void;
    protected registerUpdateEntry(): void;
    protected registerMergeCartSuccess(): void;
    protected registerCreateCart(): void;
    /**
     * Registers delete cart events
     */
    protected registerDeleteCart(): void;
    protected registerAddCartVoucher(): void;
    protected registerRemoveCartVoucher(): void;
    /**
     * Registers a stream of target events mapped from the source actions that contain the cart id equal to the active cart id.
     *
     * @param mapping mapping declaration - from `action` string type to `event` class type
     *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
     */
    protected registerMapped<T>(mapping: ActionToEventMapping<T>): () => void;
    /**
     * Returns a stream of actions only of a given type(s)
     *
     * @param actionType type(s) of actions
     */
    protected getAction(actionType: string | string[]): Observable<{
        type: string;
        payload?: any;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartEventBuilder>;
}
