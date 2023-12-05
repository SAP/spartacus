/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { createFrom } from '../../util/create-from';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../event/event.service";
/**
 * Registers streams of ngrx actions as events source streams
 */
export class StateEventService {
    constructor(actionsSubject, eventService) {
        this.actionsSubject = actionsSubject;
        this.eventService = eventService;
    }
    /**
     * Registers an event source stream of specific events
     * mapped from a given action type.
     *
     * @param mapping mapping from action to event
     *
     * @returns a teardown function that unregisters the event source
     */
    register(mapping) {
        return this.eventService.register(mapping.event, this.getFromAction(mapping));
    }
    /**
     * Returns a stream of specific events mapped from a specific action.
     * @param mapping mapping from action to event
     */
    getFromAction(mapping) {
        return this.actionsSubject
            .pipe(ofType(...[].concat(mapping.action)))
            .pipe(map((action) => this.createEvent(action, mapping.event, mapping.factory)));
    }
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
    createEvent(action, eventType, factory) {
        return factory
            ? factory(action)
            : createFrom(eventType, action.payload ?? {});
    }
}
StateEventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StateEventService, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
StateEventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StateEventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StateEventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3N0YXRlL2V2ZW50L3N0YXRlLWV2ZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBR3BEOztHQUVHO0FBSUgsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNZLGNBQThCLEVBQzlCLFlBQTBCO1FBRDFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNuQyxDQUFDO0lBRUo7Ozs7Ozs7T0FPRztJQUNILFFBQVEsQ0FBSSxPQUFnQztRQUMxQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUMvQixPQUFPLENBQUMsS0FBZ0IsRUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDNUIsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxhQUFhLENBQUksT0FBZ0M7UUFDekQsT0FBTyxJQUFJLENBQUMsY0FBYzthQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUksRUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN4RCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsTUFBcUMsRUFBRSxFQUFFLENBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDcEUsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDTyxXQUFXLENBQ25CLE1BQXVDLEVBQ3ZDLFNBQWtCLEVBQ2xCLE9BQTRCO1FBRTVCLE9BQU8sT0FBTztZQUNaLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OEdBdERVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9ldmVudC9ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZUZyb20gfSBmcm9tICcuLi8uLi91dGlsL2NyZWF0ZS1mcm9tJztcbmltcG9ydCB7IEFjdGlvblRvRXZlbnRNYXBwaW5nIH0gZnJvbSAnLi9hY3Rpb24tdG8tZXZlbnQtbWFwcGluZyc7XG5cbi8qKlxuICogUmVnaXN0ZXJzIHN0cmVhbXMgb2YgbmdyeCBhY3Rpb25zIGFzIGV2ZW50cyBzb3VyY2Ugc3RyZWFtc1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhdGVFdmVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aW9uc1N1YmplY3Q6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBzb3VyY2Ugc3RyZWFtIG9mIHNwZWNpZmljIGV2ZW50c1xuICAgKiBtYXBwZWQgZnJvbSBhIGdpdmVuIGFjdGlvbiB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0gbWFwcGluZyBtYXBwaW5nIGZyb20gYWN0aW9uIHRvIGV2ZW50XG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVhcmRvd24gZnVuY3Rpb24gdGhhdCB1bnJlZ2lzdGVycyB0aGUgZXZlbnQgc291cmNlXG4gICAqL1xuICByZWdpc3RlcjxUPihtYXBwaW5nOiBBY3Rpb25Ub0V2ZW50TWFwcGluZzxUPik6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5yZWdpc3RlcihcbiAgICAgIG1hcHBpbmcuZXZlbnQgYXMgVHlwZTxUPixcbiAgICAgIHRoaXMuZ2V0RnJvbUFjdGlvbihtYXBwaW5nKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmVhbSBvZiBzcGVjaWZpYyBldmVudHMgbWFwcGVkIGZyb20gYSBzcGVjaWZpYyBhY3Rpb24uXG4gICAqIEBwYXJhbSBtYXBwaW5nIG1hcHBpbmcgZnJvbSBhY3Rpb24gdG8gZXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBnZXRGcm9tQWN0aW9uPFQ+KG1hcHBpbmc6IEFjdGlvblRvRXZlbnRNYXBwaW5nPFQ+KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uc1N1YmplY3RcbiAgICAgIC5waXBlKG9mVHlwZSguLi4oW10gYXMgc3RyaW5nW10pLmNvbmNhdChtYXBwaW5nLmFjdGlvbikpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoYWN0aW9uOiB7IHR5cGU6IHN0cmluZzsgcGF5bG9hZD86IFQgfSkgPT5cbiAgICAgICAgICB0aGlzLmNyZWF0ZUV2ZW50KGFjdGlvbiwgbWFwcGluZy5ldmVudCBhcyBUeXBlPFQ+LCBtYXBwaW5nLmZhY3RvcnkpXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBldmVudCBpbnN0YW5jZSBmb3IgZ2l2ZW4gY2xhc3Mgb3V0IGZyb20gdGhlIGFjdGlvbiBvYmplY3QuXG4gICAqIFVubGVzcyB0aGUgYGZhY3RvcnlgIHBhcmFtZXRlciBpcyBnaXZlbiwgdGhlIGFjdGlvbidzIGBwYXlsb2FkYCBpcyB1c2VkXG4gICAqIGFzIHRoZSBhcmd1bWVudCBmb3IgdGhlIGV2ZW50J3MgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gaW5zdGFuY2Ugb2YgYW4gQWN0aW9uXG4gICAqIEBwYXJhbSBtYXBwaW5nIG1hcHBpbmcgZnJvbSBhY3Rpb24gdG8gZXZlbnRcbiAgICogQHBhcmFtIGZhY3Rvcnkgb3B0aW9uYWwgZnVuY3Rpb24gZ2V0dGluZyBhbiBhY3Rpb24gaW5zdGFuY2UgYW5kIHJldHVybmluZyBhbiBldmVudCBpbnN0YW5jZVxuICAgKlxuICAgKiBAcmV0dXJucyBpbnN0YW5jZSBvZiBhbiBFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUV2ZW50PFQ+KFxuICAgIGFjdGlvbjogeyB0eXBlOiBzdHJpbmc7IHBheWxvYWQ/OiBhbnkgfSxcbiAgICBldmVudFR5cGU6IFR5cGU8VD4sXG4gICAgZmFjdG9yeT86IChhY3Rpb246IGFueSkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gZmFjdG9yeVxuICAgICAgPyBmYWN0b3J5KGFjdGlvbilcbiAgICAgIDogY3JlYXRlRnJvbShldmVudFR5cGUsIGFjdGlvbi5wYXlsb2FkID8/IHt9KTtcbiAgfVxufVxuIl19